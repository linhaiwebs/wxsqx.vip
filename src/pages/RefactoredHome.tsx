import { useState, useEffect, useRef } from 'react';
import LineConversionConfirmModal from '../components/LineConversionConfirmModal';
import InlineLoadingScene from '../components/InlineLoadingScene';
import DiagnosisModal from '../components/DiagnosisModal';
import Footer from '../components/Footer';
import HotStocksGrid from '../components/HotStocksGrid';
import ComparisonTable from '../components/ComparisonTable';
import { StockData } from '../types/stock';
import { DiagnosisState } from '../types/diagnosis';
import { useUrlParams } from '../hooks/useUrlParams';
import { useStockSearch } from '../hooks/useStockSearch';
import { apiClient } from '../lib/apiClient';
import { userTracking } from '../lib/userTracking';
import { trackConversion, trackDiagnosisButtonClick, trackConversionButtonClick } from '../lib/googleTracking';
import { generateDiagnosisReport } from '../lib/reportGenerator';

const HOT_STOCKS = [
  { code: '7203', name: 'トヨタ自動車', price: '3,245.0', change: '+1.2%', up: true, ref: '銘柄_7203' },
  { code: '6758', name: 'ソニーグループ', price: '13,540.0', change: '-0.8%', up: false, ref: '銘柄_6758' },
  { code: '9984', name: 'ソフトバンクグループ', price: '8,920.0', change: '+2.4%', up: true, ref: '銘柄_9984' },
];

export default function RefactoredHome() {
  const urlParams = useUrlParams();
  const { search } = useStockSearch();
  const [stockCode, setStockCode] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLineConversionModal, setShowLineConversionModal] = useState(false);
  const [pendingLineUrl, setPendingLineUrl] = useState<string>('');
  const [diagnosisState, setDiagnosisState] = useState<DiagnosisState>('initial');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [showLoadingScene, setShowLoadingScene] = useState<boolean>(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isManualSelectionRef = useRef<boolean>(false);
  const isUrlAutoSelectRef = useRef<boolean>(false);
  const [searchResults, setSearchResults] = useState<Array<{code:string;name:string;market:string}>>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (urlParams.code) { isUrlAutoSelectRef.current = true; setStockCode(urlParams.code); setInputValue(urlParams.code); fetchStockData(urlParams.code, true); }
    else { setStockCode(''); setInputValue(''); isUrlAutoSelectRef.current = false; }
  }, [urlParams.code]);

  useEffect(() => {
    const trackPageVisit = async () => {
      if (stockData) { await userTracking.trackPageLoad({ stockCode, stockName: stockData.info.name, urlParams: { src: urlParams.src||'', gclid: urlParams.gclid||'', racText: urlParams.racText||'', code: urlParams.code||'' } }); }
    };
    trackPageVisit();
  }, [stockData, stockCode, urlParams]);

  const fetchStockData = async (code: string, isUrlAutoSelect = false) => {
    const cleanCode = code.replace(/[^\d]/g, '');
    if (!cleanCode || !/^\d{4}$/.test(cleanCode)) { setStockData(null); setStockCode(cleanCode); setError(null); return; }
    setLoading(true); setError(null);
    try {
      const response = await apiClient.get(`/api/stock/data?code=${cleanCode}`);
      if (!response.ok) { setStockData(null); setStockCode(cleanCode); setError(null); isUrlAutoSelectRef.current = false; return; }
      const data = await response.json(); setStockData(data); setStockCode(cleanCode); setError(null);
      if (isUrlAutoSelect && data?.info?.name) { setInputValue(`${cleanCode} ${data.info.name}`); isManualSelectionRef.current = true; }
    } catch { setStockData(null); setStockCode(cleanCode); setError(null); isUrlAutoSelectRef.current = false; }
    finally { setLoading(false); }
  };

  const handleStockSelect = (code: string, name: string) => {
    isManualSelectionRef.current = true; setInputValue(`${code} ${name}`); setStockCode(code); setShowDropdown(false); fetchStockData(code);
  };

  useEffect(() => {
    if (isManualSelectionRef.current) { isManualSelectionRef.current = false; return; }
    if (isUrlAutoSelectRef.current) return;
    const timer = setTimeout(() => { if (inputValue) fetchStockData(inputValue); }, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    if (inputValue.trim().length > 0) { const results = search(inputValue); setSearchResults(results); setShowDropdown(results.length > 0 && !/^\d{4}\s+.+/.test(inputValue)); }
    else { setSearchResults([]); setShowDropdown(false); }
  }, [inputValue, search]);

  useEffect(() => { return () => { if (progressIntervalRef.current) clearInterval(progressIntervalRef.current); }; }, []);
  useEffect(() => { const h = (e: MouseEvent) => { if (inputRef.current && !inputRef.current.contains(e.target as Node)) setShowDropdown(false); }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);

  const runDiagnosis = async () => {
    if (diagnosisState !== 'initial' || !stockCode || !stockData) return;
    trackDiagnosisButtonClick();
    setDiagnosisState('connecting'); setAnalysisResult(''); setLoadingProgress(0); setShowLoadingScene(true);
    const startTime = Date.now();
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => { setLoadingProgress(prev => prev < 85 ? prev + Math.random()*15 : prev < 95 ? prev + Math.random()*2 : prev); }, 100);
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL || ''}/api/gemini/diagnosis`;
      const controller = new AbortController(); const timeoutId = setTimeout(() => controller.abort(), 50000);
      const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: stockCode, stockData: stockData ? { name: stockData.info.name, price: stockData.info.price, change: stockData.info.change, changePercent: stockData.info.changePercent, per: stockData.info.per, pbr: stockData.info.pbr, dividend: stockData.info.dividend, industry: stockData.info.industry, marketCap: stockData.info.marketCap } : null }),
        signal: controller.signal });
      clearTimeout(timeoutId);
      if (progressIntervalRef.current) { clearInterval(progressIntervalRef.current); progressIntervalRef.current = null; }
      if (!response.ok) throw new Error('AI診断に失敗しました');
      setDiagnosisState('processing');
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('text/event-stream')) {
        const reader = response.body?.getReader(); const decoder = new TextDecoder(); let fullAnalysis = ''; let firstChunk = true;
        if (!reader) throw new Error('ストリーム読み取りに失敗しました');
        while (true) { const { done, value } = await reader.read(); if (done) break;
          const text = decoder.decode(value, { stream: true });
          for (const line of text.split('\n').filter(l => l.trim())) { if (line.startsWith('data: ')) { try { const parsed = JSON.parse(line.slice(6));
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.content) { fullAnalysis += parsed.content; if (firstChunk && fullAnalysis.trim()) { setLoadingProgress(100); const r = Math.max(0, 2000 - (Date.now() - startTime)); setTimeout(() => { setShowLoadingScene(false); setDiagnosisState('streaming'); }, r); firstChunk = false; } setAnalysisResult(fullAnalysis); }
            if (parsed.done) { setLoadingProgress(100); const r = Math.max(0, 2000 - (Date.now() - startTime)); setTimeout(() => { setShowLoadingScene(false); setDiagnosisState('results'); }, r); }
          } catch { /* ignore parse errors */ } } } }
        if (fullAnalysis.trim()) { setDiagnosisState('results'); setShowLoadingScene(false); }
      } else { const data = await response.json(); setAnalysisResult(data.analysis || data.content || ''); const r = Math.max(0, 2000 - (Date.now() - startTime)); setTimeout(() => { setShowLoadingScene(false); setDiagnosisState('results'); setLoadingProgress(100); }, r); }
    } catch (err: any) {
      let errorMessage = 'AI診断に失敗しました。もう一度お試しください。'; if (err.name === 'AbortError') errorMessage = 'リクエストがタイムアウトしました。'; else if (err.message) errorMessage = err.message;
      setError(errorMessage); const r = Math.max(0, 2000 - (Date.now() - startTime));
      setTimeout(() => { setDiagnosisState('error'); setShowLoadingScene(false); setLoadingProgress(0); if (progressIntervalRef.current) { clearInterval(progressIntervalRef.current); progressIntervalRef.current = null; } }, r);
    }
  };

  const handleLineConversion = async () => { try { trackConversionButtonClick(); const response = await apiClient.get('/api/line-redirects/select'); if (!response.ok) { alert('LINEリンクの取得に失敗しました。'); return; } const data = await response.json(); if (!data.success || !data.link) { alert('現在利用可能なLINEリンクがありません。'); return; } setPendingLineUrl(data.link.redirect_url); setShowLineConversionModal(true); } catch { alert('操作に失敗しました。'); } };
  const confirmLineConversion = async () => { try { trackConversion(); if (navigator.sendBeacon) { navigator.sendBeacon('/api/tracking/event', JSON.stringify({ sessionId: sessionStorage.getItem('sessionId')||'', eventType: 'conversion', gclid: urlParams.gclid, eventData: { conversion_time: new Date().toISOString() } })); } else { await userTracking.trackConversion({ gclid: urlParams.gclid }); } window.location.href = pendingLineUrl; } catch { window.location.href = pendingLineUrl; } };
  const handleReportDownload = async () => { try { const response = await apiClient.get('/api/line-redirects/select'); let lineRedirectUrl = ''; if (response.ok) { const data = await response.json(); if (data.success && data.link) lineRedirectUrl = data.link.redirect_url; } await generateDiagnosisReport({ stockCode, stockName: stockData?.info.name||'', analysis: analysisResult, lineRedirectUrl }); await userTracking.trackEvent({ sessionId: sessionStorage.getItem('sessionId')||'', eventType: 'report_download', stockCode, stockName: stockData?.info.name||'', eventData: { reportFormat: 'docx', timestamp: new Date().toISOString() } }); } catch { alert('レポートのダウンロードに失敗しました。'); } };
  const closeModal = () => { setDiagnosisState('initial'); setAnalysisResult(''); setLoadingProgress(0); setShowLoadingScene(false); setError(null); setStockCode(''); setInputValue(''); setStockData(null); if (progressIntervalRef.current) { clearInterval(progressIntervalRef.current); progressIntervalRef.current = null; } };

  return (
    <div className="bg-background text-on-background grid-bg min-h-screen flex flex-col font-body-base text-body-base">
      <LineConversionConfirmModal isOpen={showLineConversionModal} onConfirm={confirmLineConversion} onCancel={() => setShowLineConversionModal(false)} />

      {/* TopAppBar */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-outline-variant shadow-[0_0_10px_rgba(0,230,57,0.15)] fixed top-0 w-full z-50">
        <div className="flex justify-between items-center px-margin py-unit h-16 w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-fixed-dim">terminal</span>
            <span className="font-display-lg text-headline-md tracking-tighter text-primary-fixed-dim">SNXWX</span>
          </div>
          <div>
            <button className="bg-primary-fixed-dim text-on-primary-fixed font-data-mono text-data-mono px-4 py-2 rounded hover:bg-primary-container transition-colors duration-200">
              診断する
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-12 px-gutter max-w-container-max mx-auto w-full flex flex-col gap-12">
        {!showLoadingScene ? (
          <>
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-12 gap-6 relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,230,57,0.1)_0%,transparent_70%)] pointer-events-none" />
              <h1 className="font-display-lg text-display-lg text-on-surface z-10 relative">
                AI株価診断で<br /><span className="text-primary-fixed-dim">未来を読み解く</span>
              </h1>
              <p className="text-on-surface-variant max-w-md z-10">
                高度な機械学習アルゴリズムが、リアルタイムデータと過去のトレンドを分析。あなたの投資判断をテクニカルにサポートします。
              </p>
              <div className="w-full max-w-lg mt-8 z-10 flex flex-col gap-4">
                <div className="relative w-full">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim material-symbols-outlined">search</span>
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => { if (searchResults.length > 0) setShowDropdown(true); }}
                    className="w-full bg-surface-container-low border border-outline-variant rounded py-4 pl-12 pr-4 text-on-surface font-data-mono focus:outline-none focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim neon-glow transition-all placeholder:text-outline"
                    placeholder="銘柄コードまたは企業名を入力"
                    type="text"
                  />
                  {showDropdown && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 z-50 bg-surface-container border border-outline-variant rounded shadow-lg max-h-60 overflow-y-auto animate-fadeIn mt-1">
                      {searchResults.slice(0, 5).map((stock, i) => (
                        <button key={`${stock.code}-${i}`} onClick={() => handleStockSelect(stock.code, stock.name)}
                          className="w-full px-4 py-2.5 text-left hover:bg-surface-container-high transition-colors border-b border-outline-variant last:border-b-0">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span className="font-data-mono text-data-mono text-primary-fixed-dim font-bold">{stock.code}</span>
                              <span className="font-body-base text-body-base text-on-surface-variant">{stock.name}</span>
                            </div>
                            <span className="font-label-xs text-label-xs text-outline bg-surface-container-high px-2 py-1 rounded">{stock.market}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {loading && <div className="text-center"><div className="inline-block animate-spin h-6 w-6 border-2 border-surface-container-highest border-t-primary-fixed-dim rounded-full" /></div>}
                {error && diagnosisState !== 'error' && <div className="bg-error-container/20 border border-error/30 p-2 text-center rounded"><p className="text-error font-data-mono text-data-mono">{error}</p></div>}
                {!loading && diagnosisState === 'initial' && (
                  <button onClick={runDiagnosis} disabled={!inputValue || !stockCode}
                    className="w-full bg-primary-fixed-dim text-on-primary-fixed font-data-mono text-body-base font-bold py-4 rounded hover:bg-primary-container transition-all neon-glow-hover uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    <span className="material-symbols-outlined fill">insights</span> 診断開始
                  </button>
                )}
                {diagnosisState === 'error' && (
                  <div className="bg-surface-container-low border border-error/30 rounded p-4 text-center animate-fadeIn">
                    <h3 className="font-headline-md text-headline-md text-error mb-2">エラー</h3>
                    <p className="font-body-base text-body-base text-on-surface-variant whitespace-pre-line mb-4">{error}</p>
                    <button onClick={() => { setDiagnosisState('initial'); setError(null); }}
                      className="border border-primary-fixed-dim text-primary-fixed-dim font-data-mono text-data-mono py-2 px-6 rounded hover:bg-primary-fixed-dim/10 transition-colors neon-glow-hover">
                      再試行
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Nikkei Hot Stocks Section */}
            <HotStocksGrid stocks={HOT_STOCKS} onStockClick={(code, name) => handleStockSelect(code, name)} />

            {/* Comparison Section */}
            <ComparisonTable />
          </>
        ) : (
          <InlineLoadingScene isVisible={showLoadingScene} />
        )}
      </main>

      <Footer />
      <DiagnosisModal isOpen={diagnosisState === 'streaming' || diagnosisState === 'results'} onClose={closeModal} analysis={analysisResult}
        stockCode={inputValue} stockName={stockData?.info.name || inputValue} onLineConversion={handleLineConversion} onReportDownload={handleReportDownload}
        isStreaming={diagnosisState === 'streaming'} isConnecting={diagnosisState === 'connecting'} />
    </div>
  );
}
