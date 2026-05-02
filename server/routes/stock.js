import express from 'express';
import { searchStocks, createOrUpdateStock } from '../database/sqliteHelpers.js';
import db from '../database/sqlite.js';
import { randomUUID } from 'crypto';

const router = express.Router();

// ============================================
// Stock data cache (SQLite-backed)
// ============================================
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache for stock price data
const CACHE_INFO_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours for stock basic info

function ensureStockCacheTable() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS stock_data_cache (
      id TEXT PRIMARY KEY,
      stock_code TEXT UNIQUE NOT NULL,
      stock_data TEXT NOT NULL,
      source TEXT DEFAULT 'kabutan',
      created_at TEXT DEFAULT (datetime('now')),
      expires_at TEXT NOT NULL,
      hit_count INTEGER DEFAULT 0,
      last_hit_at TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_stock_data_cache_code ON stock_data_cache(stock_code);
    CREATE INDEX IF NOT EXISTS idx_stock_data_cache_expires ON stock_data_cache(expires_at);
  `);
}

try {
  ensureStockCacheTable();
  console.log('✅ Stock data cache table ready');
} catch (e) {
  console.error('Failed to create stock_data_cache table:', e.message);
}

function getCachedStockData(code) {
  const now = new Date().toISOString();
  const cached = db.prepare(
    'SELECT * FROM stock_data_cache WHERE stock_code = ? AND expires_at > ?'
  ).get(code, now);
  if (cached) {
    db.prepare(
      'UPDATE stock_data_cache SET hit_count = hit_count + 1, last_hit_at = ? WHERE id = ?'
    ).run(now, cached.id);
    return { ...JSON.parse(cached.stock_data), _cached: true, _source: cached.source };
  }
  return null;
}

function saveStockDataCache(code, data, source = 'kabutan') {
  const now = new Date();
  const isPriceData = data.info && data.info.price;
  const ttl = isPriceData ? CACHE_TTL_MS : CACHE_INFO_TTL_MS;
  const expiresAt = new Date(now.getTime() + ttl);
  const id = randomUUID();

  const existing = db.prepare('SELECT id FROM stock_data_cache WHERE stock_code = ?').get(code);
  if (existing) {
    db.prepare(
      'UPDATE stock_data_cache SET stock_data = ?, source = ?, created_at = ?, expires_at = ? WHERE id = ?'
    ).run(JSON.stringify(data), source, now.toISOString(), expiresAt.toISOString(), existing.id);
  } else {
    db.prepare(
      'INSERT INTO stock_data_cache (id, stock_code, stock_data, source, expires_at) VALUES (?, ?, ?, ?, ?)'
    ).run(id, code, JSON.stringify(data), source, expiresAt.toISOString());
  }
}

// ============================================
// Rate limiter for kabutan.jp requests
// ============================================
const MIN_REQUEST_INTERVAL_MS = 1500; // Min 1.5s between requests to kabutan
let lastKabutanRequestTime = 0;
const pendingRequests = new Map(); // request deduplication: code -> Promise

async function waitForRateLimit() {
  const now = Date.now();
  const elapsed = now - lastKabutanRequestTime;
  if (elapsed < MIN_REQUEST_INTERVAL_MS) {
    await new Promise(r => setTimeout(r, MIN_REQUEST_INTERVAL_MS - elapsed));
  }
  lastKabutanRequestTime = Date.now();
}

// ============================================
// Fetch with timeout and retry
// ============================================
async function fetchWithRetry(url, options = {}, maxRetries = 2) {
  const { timeoutMs = 10000, ...fetchOpts } = options;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...fetchOpts,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        console.warn(`[Stock] Request timeout (attempt ${attempt + 1}/${maxRetries + 1}): ${url}`);
      } else {
        console.warn(`[Stock] Request failed (attempt ${attempt + 1}/${maxRetries + 1}): ${error.message}`);
      }
      if (attempt < maxRetries) {
        const backoffMs = Math.pow(2, attempt) * 1000 + Math.random() * 500;
        await new Promise(r => setTimeout(r, backoffMs));
      } else {
        throw error;
      }
    }
  }
}

// ============================================
// Cloudflare / block detection
// ============================================
function isBlockedResponse(html, statusCode) {
  if (statusCode === 403 || statusCode === 429) return true;
  if (html.includes('cf-challenge') || html.includes('cf-browser-verification')) return true;
  if (html.includes('Just a moment') && html.includes('Cloudflare')) return true;
  if (html.includes('captcha') && html.includes('challenge')) return true;
  if (html.includes('Access denied') && html.includes('ray ID')) return true;
  return false;
}

// ============================================
// kabutan.jp parser (primary source)
// ============================================
const KABUTAN_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'ja,en-US;q=0.7,en;q=0.3',
  'Accept-Encoding': 'gzip, deflate',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Cache-Control': 'max-age=0',
};

function parseStockInfo(html) {
  try {
    const codeMatch = html.match(/<h2><span class="inline-block">(\d+)<\/span>/);
    const nameMatch = html.match(/<h2><span class="inline-block">\d+<\/span><span class="fs0">　<\/span>([^<]+)<\/h2>/);
    const marketMatch = html.match(/<span class="market">([^<]+)<\/span>/);
    const timeMatch = html.match(/<time datetime="([^"]+)">([^<]+)<\/time>/);
    const priceMatch = html.match(/<span class="kabuka">([0-9,]+(?:\.[0-9]+)?)円<\/span>/);
    const changeMatch = html.match(/<dt>前日比<\/dt>\s*<dd><span class="(up|down)">([^<]+)<\/span><\/dd>\s*<dd><span class="(?:up|down)">([^<]+)<\/span>/);
    const ptsMatch = html.match(/<div class="kabuka2">([0-9,]+)円<\/div>\s*<div class="kabuka3">([^<]+)<\/div>/);
    const industryMatch = html.match(/<a href="\/themes\/\?industry=[^"]+">([^<]+)<\/a>/);
    const unitMatch = html.match(/<dt>単位<\/dt>\s*<dd>([^<]+)<\/dd>/);
    const perMatch = html.match(/<td>([0-9.]+)<span class="fs9">倍<\/span><\/td>/);
    const pbrMatch = html.match(/<td>([0-9.]+)<span class="fs9">倍<\/span><\/td>[\s\S]*?<td>([0-9.]+)<span class="fs9">倍<\/span><\/td>/);
    const dividendMatch = html.match(/<td>([0-9.]+)<span class="fs9">％<\/span><\/td>/);
    const creditMatch = html.match(/<td>([0-9.]+)<span class="fs9">倍<\/span><\/td>\s*<\/tr>/);
    const marketCapMatch = html.match(/<td colspan="2" class="v_zika2">([0-9,]+)<span>億円<\/span><\/td>/);
    const earningsMatch = html.match(/<time datetime="([^"]+)">([^<]+)<\/time>/);

    if (!codeMatch || !nameMatch || !priceMatch) {
      return null;
    }

    return {
      code: codeMatch[1],
      name: nameMatch[1],
      market: marketMatch ? marketMatch[1] : '',
      price: priceMatch[1],
      change: changeMatch ? changeMatch[2] : '0',
      changePercent: changeMatch ? changeMatch[3] : '0',
      timestamp: timeMatch ? timeMatch[2] : '',
      ptsPrice: ptsMatch ? ptsMatch[1] : undefined,
      ptsTime: ptsMatch ? ptsMatch[2] : undefined,
      industry: industryMatch ? industryMatch[1] : '',
      unit: unitMatch ? unitMatch[1].trim() : '',
      per: perMatch ? perMatch[1] : '',
      pbr: pbrMatch ? pbrMatch[2] : '',
      dividend: dividendMatch ? dividendMatch[1] : '',
      creditRatio: creditMatch ? creditMatch[1] : '',
      marketCap: marketCapMatch ? marketCapMatch[1] : '',
      earningsDate: earningsMatch ? earningsMatch[2] : undefined,
    };
  } catch (error) {
    console.error('[Stock] Error parsing kabutan stock info:', error);
    return null;
  }
}

function parseStockPrices(html) {
  const prices = [];

  try {
    const tableMatch = html.match(/<table class="stock_kabuka_dwm">[\s\S]*?<\/table>/);
    if (!tableMatch) return prices;

    const rowRegex = /<tr>\s*<th scope="row"><time datetime="([^"]+)">([^<]+)<\/time><\/th>\s*<td>([0-9,.]+)<\/td>\s*<td>([0-9,.]+)<\/td>\s*<td>([0-9,.]+)<\/td>\s*<td>([0-9,.]+)<\/td>\s*<td><span class="(up|down)?">([^<]+)<\/span><\/td>\s*<td><span class="(?:up|down)?">([^<]+)<\/span><\/td>\s*<td>([0-9,]+)<\/td>/g;

    let match;
    while ((match = rowRegex.exec(tableMatch[0])) !== null) {
      prices.push({
        date: match[2],
        open: match[3],
        high: match[4],
        low: match[5],
        close: match[6],
        change: match[8],
        changePercent: match[9],
        volume: match[10],
      });
    }

    const todayMatch = html.match(/<table class="stock_kabuka0">[\s\S]*?<tr>\s*<th scope="row"><time datetime="([^"]+)">([^<]+)<\/time><\/th>\s*<td>([0-9,.]+)<\/td>\s*<td>([0-9,.]+)<\/td>\s*<td>([0-9,.]+)<\/td>\s*<td>([0-9,.]+)<\/td>\s*<td><span class="(up|down)?">([^<]+)<\/span><\/td>\s*<td><span class="(?:up|down)?">([^<]+)<\/span><\/td>\s*<td>([0-9,]+)<\/td>/);

    if (todayMatch) {
      prices.unshift({
        date: todayMatch[2],
        open: todayMatch[3],
        high: todayMatch[4],
        low: todayMatch[5],
        close: todayMatch[6],
        change: todayMatch[8],
        changePercent: todayMatch[9],
        volume: todayMatch[10],
      });
    }
  } catch (error) {
    console.error('[Stock] Error parsing kabutan stock prices:', error);
  }

  return prices;
}

async function fetchFromKabutan(code) {
  await waitForRateLimit();

  const stockUrl = `https://kabutan.jp/stock/kabuka?code=${code}`;
  console.log(`[Stock] Fetching from kabutan.jp: ${code}`);

  const response = await fetchWithRetry(stockUrl, {
    headers: KABUTAN_HEADERS,
    timeoutMs: 10000,
  });

  if (!response.ok) {
    throw new Error(`kabutan.jp returned HTTP ${response.status}`);
  }

  const html = await response.text();

  if (isBlockedResponse(html, response.status)) {
    throw new Error('kabutan.jp blocked the request (Cloudflare/rate limit)');
  }

  const stockInfo = parseStockInfo(html);
  const stockPrices = parseStockPrices(html);

  if (!stockInfo) {
    throw new Error('Failed to parse kabutan.jp stock data - HTML structure may have changed');
  }

  return { info: stockInfo, prices: stockPrices };
}

// ============================================
// Yahoo Finance fallback parser
// ============================================
function formatNumber(num) {
  if (num == null) return '';
  return num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
}

function formatChange(val) {
  if (val == null) return '0';
  const sign = val > 0 ? '+' : '';
  return sign + formatNumber(val);
}

function formatPercent(val) {
  if (val == null) return '0';
  const sign = val > 0 ? '+' : '';
  return sign + val.toFixed(2);
}

function formatVolume(vol) {
  if (vol == null) return '';
  return vol.toLocaleString('en-US');
}

function formatDateFromTimestamp(ts) {
  const d = new Date(ts * 1000);
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yy}/${mm}/${dd}`;
}

function formatTimeFromTimestamp(ts) {
  const d = new Date(ts * 1000);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

async function fetchFromYahoo(code) {
  console.log(`[Stock] Falling back to Yahoo Finance: ${code}`);

  const yahooSymbol = `${code}.T`;
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d&range=1mo`;

  const response = await fetchWithRetry(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    },
    timeoutMs: 10000,
  });

  if (!response.ok) {
    throw new Error(`Yahoo Finance returned HTTP ${response.status}`);
  }

  const json = await response.json();

  if (!json.chart || !json.chart.result || json.chart.result.length === 0) {
    throw new Error('Yahoo Finance returned no data');
  }

  const result = json.chart.result[0];
  const meta = result.meta;
  const quotes = result.indicators.quote[0];
  const timestamps = result.timestamp || [];

  const price = meta.regularMarketPrice;
  const prevClose = meta.chartPreviousClose || meta.previousClose;
  const change = prevClose != null ? price - prevClose : null;
  const changePercent = prevClose != null ? (change / prevClose) * 100 : null;

  const stockInfo = {
    code,
    name: meta.shortName || meta.longName || code,
    market: meta.fullExchangeName || 'TSE',
    price: formatNumber(price),
    change: formatChange(change),
    changePercent: formatPercent(changePercent),
    timestamp: meta.regularMarketTime ? formatTimeFromTimestamp(meta.regularMarketTime) : '',
    ptsPrice: undefined,
    ptsTime: undefined,
    industry: '',
    unit: '',
    per: '',
    pbr: '',
    dividend: '',
    creditRatio: '',
    marketCap: '',
    earningsDate: undefined,
  };

  const prices = [];
  for (let i = 0; i < timestamps.length; i++) {
    if (quotes.close[i] == null) continue;
    const dayClose = quotes.close[i];
    const prevDayClose = i > 0 ? quotes.close[i - 1] : prevClose;
    const dayChange = prevDayClose != null ? dayClose - prevDayClose : null;
    const dayChangePct = prevDayClose != null ? (dayChange / prevDayClose) * 100 : null;

    prices.push({
      date: formatDateFromTimestamp(timestamps[i]),
      open: formatNumber(quotes.open[i]),
      high: formatNumber(quotes.high[i]),
      low: formatNumber(quotes.low[i]),
      close: formatNumber(dayClose),
      change: formatChange(dayChange),
      changePercent: formatPercent(dayChangePct),
      volume: formatVolume(quotes.volume[i]),
    });
  }

  return { info: stockInfo, prices };
}

// ============================================
// Unified stock data fetcher with cache + dedup + fallback
// ============================================
let kabutanBlockedUntil = 0; // timestamp when kabutan block expires

async function fetchStockData(code) {
  // 1. Check cache first
  const cached = getCachedStockData(code);
  if (cached) {
    console.log(`[Stock] Cache hit: ${code} (source: ${cached._source})`);
    return cached;
  }

  // 2. Request deduplication: if same code is being fetched, wait for that result
  if (pendingRequests.has(code)) {
    console.log(`[Stock] Dedup: waiting for in-flight request: ${code}`);
    return pendingRequests.get(code);
  }

  // 3. Create the fetch promise
  const fetchPromise = (async () => {
    try {
      let data = null;
      let source = 'kabutan';

      // Try kabutan first (unless we know it's blocked)
      if (Date.now() > kabutanBlockedUntil) {
        try {
          data = await fetchFromKabutan(code);
        } catch (kabutanError) {
          console.warn(`[Stock] kabutan.jp failed: ${kabutanError.message}`);

          // If blocked by Cloudflare/rate limit, mark kabutan as blocked for 10 minutes
          if (kabutanError.message.includes('blocked') || kabutanError.message.includes('Cloudflare') || kabutanError.message.includes('403')) {
            kabutanBlockedUntil = Date.now() + 10 * 60 * 1000;
            console.warn('[Stock] kabutan.jp marked as blocked for 10 minutes');
          }

          // If parsing failed (HTML changed), don't mark as blocked, just fall back
        }
      }

      // Fallback to Yahoo Finance
      if (!data) {
        try {
          data = await fetchFromYahoo(code);
          source = 'yahoo';
        } catch (yahooError) {
          console.error(`[Stock] Yahoo Finance also failed: ${yahooError.message}`);
          throw new Error(`All stock data sources failed. Kabutan: ${kabutanError?.message || 'skipped'}, Yahoo: ${yahooError.message}`);
        }
      }

      // Save to database
      if (data.info && data.info.name && source === 'kabutan') {
        createOrUpdateStock({
          code: data.info.code,
          name: data.info.name,
          market: data.info.market || '',
          industry: data.info.industry || '',
        });
      }

      // Save to cache
      saveStockDataCache(code, data, source);

      return { ...data, _source: source };
    } finally {
      pendingRequests.delete(code);
    }
  })();

  pendingRequests.set(code, fetchPromise);
  return fetchPromise;
}

// ============================================
// Clean expired stock cache periodically
// ============================================
setInterval(() => {
  try {
    const now = new Date().toISOString();
    const result = db.prepare('DELETE FROM stock_data_cache WHERE expires_at <= ?').run(now);
    if (result.changes > 0) {
      console.log(`[Stock] Cleaned ${result.changes} expired cache entries`);
    }
  } catch (e) {
    console.error('[Stock] Cache cleanup error:', e.message);
  }
}, 30 * 60 * 1000); // every 30 minutes

// ============================================
// Routes
// ============================================
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.json({ results: [] });
    }

    const query = q.trim();
    const results = searchStocks(query);

    res.json({ results });
  } catch (error) {
    console.error('[Stock] Error in search endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
});

router.get('/data', async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Stock code is required' });
    }

    const cleanCode = String(code).trim();

    if (!/^\d{4,6}$/.test(cleanCode)) {
      return res.status(400).json({ error: 'Invalid stock code format' });
    }

    const data = await fetchStockData(cleanCode);

    // Remove internal fields before sending to client
    const { _cached, _source, ...responseData } = data;

    res.json(responseData);
  } catch (error) {
    console.error('[Stock] Error in data endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
});

export default router;
