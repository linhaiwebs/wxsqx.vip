import { useState, useEffect, useRef } from 'react';
import LineConversionConfirmModal from '../components/LineConversionConfirmModal';
import InlineLoadingScene from '../components/InlineLoadingScene';
import DiagnosisModal from '../components/DiagnosisModal';
import Footer from '../components/Footer';
import TrendingStocks from '../components/TrendingStocks';
import ComparisonSection from '../components/ComparisonSection';
import { StockData } from '../types/stock';
import { DiagnosisState } from '../types/diagnosis';
import { useUrlParams } from '../hooks/useUrlParams';
import { useStockSearch } from '../hooks/useStockSearch';
import { apiClient } from '../lib/apiClient';
import { userTracking } from '../lib/userTracking';
import { trackConversion, trackDiagnosisButtonClick, trackConversionButtonClick } from '../lib/googleTracking';
import { generateDiagnosisReport } from '../lib/reportGenerator';

const HOT_STOCKS = [
  { code: '7203', name: 'トヨタ', industry: '自動車・モビリティ' },
  { code: '6758', name: 'ソニー', industry: 'エレクトロニクス・エンタメ' },
  { code: '9984', name: 'ソフトバンク', industry: '情報通信・テクノロジー' },
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
    if (urlParams.code) {
      isUrlAutoSelectRef.current = true;
      setStockCode(urlParams.code);
      setInputValue(urlParams.code);
      fetchStockData(urlParams.code, true);
    } else {
      setStockCode(''); setInputValue(''); isUrlAutoSelectRef.current = false;
    }
  }, [urlParams.code]);

  useEffect(() => {
    const trackPageVisit = async () => {
      if (stockData) {
        await userTracking.trackPageLoad({
          stockCode, stockName: stockData.info.name,
          urlParams: { src: urlParams.src||'', gclid: urlParams.gclid||'', racText: urlParams.racText||'', code: urlParams.code||'' }
        });
      }
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
      const data = await response.json();
      setStockData(data); setStockCode(cleanCode); setError(null);
      if (isUrlAutoSelect && data?.info?.name) { setInputValue(`${cleanCode} ${data.info.name}`); isManualSelectionRef.current = true; }
    } catch { setStockData(null); setStockCode(cleanCode); setError(null); isUrlAutoSelectRef.current = false; }
    finally { setLoading(false); }
  };

  const handleStockSelect = (code: string, name: string) => {
    isManualSelectionRef.current = true;
    setInputValue(`${code} ${name}`); setStockCode(code); setShowDropdown(false); fetchStockData(code);
  };

  useEffect(() => {
    if (isManualSelectionRef.current) { isManualSelectionRef.current = false; return; }
    if (isUrlAutoSelectRef.current) return;
    const timer = setTimeout(() => { if (inputValue) fetchStockData(inputValue); }, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    if (inputValue.trim().length > 0) {
      const results = search(inputValue);
      setSearchResults(results);
      setShowDropdown(results.length > 0 && !/^\d{4}\s+.+/.test(inputValue));
    } else { setSearchResults([]); setShowDropdown(false); }
  }, [inputValue, search]);

  useEffect(() => { return () => { if (progressIntervalRef.current) clearInterval(progressIntervalRef.current); }; }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) setShowDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const runDiagnosis = async () => {
    if (diagnosisState !== 'initial' || !stockCode || !stockData) return;
    trackDiagnosisButtonClick();
    setDiagnosisState('connecting'); setAnalysisResult(''); setLoadingProgress(0); setShowLoadingScene(true);
    const startTime = Date.now();
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      setLoadingProgress(prev => prev < 85 ? prev + Math.random()*15 : prev < 95 ? prev + Math.random()*2 : prev);
    }, 100);

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL || ''}/api/gemini/diagnosis`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 50000);
      const response = await fetch(apiUrl, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: stockCode, stockData: stockData ? {
          name: stockData.info.name, price: stockData.info.price, change: stockData.info.change,
          changePercent: stockData.info.changePercent, per: stockData.info.per, pbr: stockData.info.pbr,
          dividend: stockData.info.dividend, industry: stockData.info.industry, marketCap: stockData.info.marketCap,
        } : null }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (progressIntervalRef.current) { clearInterval(progressIntervalRef.current); progressIntervalRef.current = null; }
      if (!response.ok) throw new Error('AI診断に失敗しました');
      setDiagnosisState('processing');
      const contentType = response.headers.get('content-type');

      if (contentType?.includes('text/event-stream')) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullAnalysis = '';
        let firstChunk = true;
        if (!reader) throw new Error('ストリーム読み取りに失敗しました');
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value, { stream: true });
          for (const line of text.split('\n').filter(l => l.trim())) {
            if (line.startsWith('data: ')) {
              try {
                const parsed = JSON.parse(line.slice(6));
                if (parsed.error) throw new Error(parsed.error);
                if (parsed.content) {
                  fullAnalysis += parsed.content;
                  if (firstChunk && fullAnalysis.trim()) {
                    setLoadingProgress(100);
                    const remaining = Math.max(0, 2000 - (Date.now() - startTime));
                    setTimeout(() => { setShowLoadingScene(false); setDiagnosisState('streaming'); }, remaining);
                    firstChunk = false;
                  }
                  setAnalysisResult(fullAnalysis);
                }
                if (parsed.done) {
                  setLoadingProgress(100);
                  const remaining = Math.max(0, 2000 - (Date.now() - startTime));
                  setTimeout(() => { setShowLoadingScene(false); setDiagnosisState('results'); }, remaining);
                }
              } catch { /* ignore parse errors */ }
            }
          }
        }
        if (fullAnalysis.trim()) { setDiagnosisState('results'); setShowLoadingScene(false); }
      } else {
        const data = await response.json();
        setAnalysisResult(data.analysis || data.content || '');
        const remaining = Math.max(0, 2000 - (Date.now() - startTime));
        setTimeout(() => { setShowLoadingScene(false); setDiagnosisState('results'); setLoadingProgress(100); }, remaining);
      }
    } catch (err: any) {
      let errorMessage = 'AI診断に失敗しました。もう一度お試しください。';
      if (err.name === 'AbortError') errorMessage = 'リクエストがタイムアウトしました。';
      else if (err.message) errorMessage = err.message;
      setError(errorMessage);
      const remaining = Math.max(0, 2000 - (Date.now() - startTime));
      setTimeout(() => {
        setDiagnosisState('error'); setShowLoadingScene(false); setLoadingProgress(0);
        if (progressIntervalRef.current) { clearInterval(progressIntervalRef.current); progressIntervalRef.current = null; }
      }, remaining);
    }
  };

  const handleLineConversion = async () => {
    try {
      trackConversionButtonClick();
      const response = await apiClient.get('/api/line-redirects/select');
      if (!response.ok) { alert('LINEリンクの取得に失敗しました。'); return; }
      const data = await response.json();
      if (!data.success || !data.link) { alert('現在利用可能なLINEリンクがありません。'); return; }
      setPendingLineUrl(data.link.redirect_url); setShowLineConversionModal(true);
    } catch { alert('操作に失敗しました。'); }
  };

  const confirmLineConversion = async () => {
    try {
      trackConversion();
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/tracking/event', JSON.stringify({
          sessionId: sessionStorage.getItem('sessionId')||'', eventType: 'conversion', gclid: urlParams.gclid,
          eventData: { conversion_time: new Date().toISOString() }
        }));
      } else { await userTracking.trackConversion({ gclid: urlParams.gclid }); }
      window.location.href = pendingLineUrl;
    } catch { window.location.href = pendingLineUrl; }
  };

  const handleReportDownload = async () => {
    try {
      const response = await apiClient.get('/api/line-redirects/select');
      let lineRedirectUrl = '';
      if (response.ok) { const data = await response.json(); if (data.success && data.link) lineRedirectUrl = data.link.redirect_url; }
      await generateDiagnosisReport({ stockCode, stockName: stockData?.info.name||'', analysis: analysisResult, lineRedirectUrl });
      await userTracking.trackEvent({
        sessionId: sessionStorage.getItem('sessionId')||'', eventType: 'report_download',
        stockCode, stockName: stockData?.info.name||'', eventData: { reportFormat: 'docx', timestamp: new Date().toISOString() }
      });
    } catch { alert('レポートのダウンロードに失敗しました。'); }
  };

  const closeModal = () => {
    setDiagnosisState('initial'); setAnalysisResult(''); setLoadingProgress(0);
    setShowLoadingScene(false); setError(null); setStockCode(''); setInputValue(''); setStockData(null);
    if (progressIntervalRef.current) { clearInterval(progressIntervalRef.current); progressIntervalRef.current = null; }
  };

  return (
    <div className="bg-background text-on-background antialiased relative min-h-screen pb-20 overflow-x-hidden flex flex-col">
      <LineConversionConfirmModal isOpen={showLineConversionModal} onConfirm={confirmLineConversion} onCancel={() => setShowLineConversionModal(false)} />

      {/* Background Mist Layers */}
      <div className="mist-blob bg-primary-fixed w-[300px] h-[300px] top-[-100px] right-[-100px]" />
      <div className="mist-blob bg-secondary-fixed w-[250px] h-[250px] top-[353px] left-[-100px]" />

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/15 backdrop-blur-xl border-b border-primary/10">
        <div className="flex justify-between items-center px-container-margin h-14 w-full">
          <button className="text-primary hover:opacity-70 transition-opacity active:scale-95 duration-200">
            <span className="material-symbols-outlined">psychology</span>
          </button>
          <h1 className="font-headline-md text-headline-md text-primary tracking-tight">NMSLM</h1>
          <button className="text-primary hover:opacity-70 transition-opacity active:scale-95 duration-200">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>

      <main className="flex-grow pt-[88px] px-container-margin flex flex-col gap-section-padding">
        {!showLoadingScene ? (
          <>
            {/* Hero Section */}
            <section className="flex flex-col gap-stack-gap">
              <h2 className="font-headline-lg text-headline-lg text-on-background max-w-[300px]">感情で読み解く、新しい投資体験</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">今の気持ちを診断して、あなたに最適な銘柄を見つけましょう。</p>
              <div className="mt-4 flex flex-col gap-stack-gap relative">
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => { if (searchResults.length > 0) setShowDropdown(true); }}
                  className="w-full bg-transparent border-0 border-b border-outline rounded-none px-0 py-2 focus:ring-0 focus:border-b-2 focus:border-primary font-body-lg text-body-lg text-on-background placeholder-on-surface-variant transition-colors"
                  placeholder="証券コードまたは企業名を入力"
                  type="text"
                />
                {showDropdown && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-50 bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-lg max-h-60 overflow-y-auto animate-fadeIn">
                    {searchResults.slice(0, 5).map((stock, i) => (
                      <button key={`${stock.code}-${i}`} onClick={() => handleStockSelect(stock.code, stock.name)}
                        className="w-full px-4 py-2.5 text-left hover:bg-surface-container transition-colors border-b border-outline-variant/20 last:border-b-0">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="font-body-lg text-body-lg font-bold text-primary">{stock.code}</span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">{stock.name}</span>
                          </div>
                          <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container px-2 py-1 rounded">{stock.market}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {loading && (
                  <div className="text-center py-2 animate-fadeIn">
                    <div className="inline-block animate-spin h-8 w-8 border-2 border-surface-container-highest border-t-primary rounded-full" />
                  </div>
                )}
                {error && diagnosisState !== 'error' && (
                  <div className="bg-error-container border-l-4 border-error p-2 text-center animate-fadeIn">
                    <p className="text-error font-body-sm text-body-sm font-bold">{error}</p>
                  </div>
                )}
                {!loading && diagnosisState === 'initial' && (
                  <button onClick={runDiagnosis} disabled={!inputValue || !stockCode}
                    className="bg-primary text-on-primary w-full py-3 rounded-full font-body-lg text-body-lg font-bold mt-2 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed">
                    診断を開始
                  </button>
                )}
                {diagnosisState === 'error' && (
                  <div className="glass-panel border border-primary/10 rounded-xl p-component-padding-x text-center animate-fadeIn">
                    <h3 className="font-headline-md text-headline-md text-error mb-2">エラー</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-pre-line mb-4">{error}</p>
                    <button onClick={() => { setDiagnosisState('initial'); setError(null); }}
                      className="bg-primary-container text-on-primary font-body-lg text-body-lg py-3 rounded-full font-bold active:scale-95 transition-transform">
                      もう一度試す
                    </button>
                  </div>
                )}
              </div>
            </section>

            <div className="zen-divider" />

            {/* Diagnostic Result Preview */}
            {stockData && diagnosisState === 'initial' && (
              <>
                <section className="glass-panel border border-primary/10 rounded-xl p-component-padding-x flex flex-col gap-stack-gap relative overflow-hidden shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed/20 to-transparent pointer-events-none" />
                  <h3 className="font-headline-md text-headline-md text-on-background relative z-10">診断結果プレビュー</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant relative z-10">
                    {stockData.info.name}（{stockCode}）の分析準備ができています。
                  </p>
                  <div className="w-full h-40 bg-surface-container-high/50 rounded-lg border border-outline-variant/30 flex items-center justify-center my-2 relative z-10">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary-container to-secondary-container blur-sm opacity-80 animate-pulse" />
                  </div>
                  <button onClick={runDiagnosis}
                    className="bg-primary-container text-on-primary-container font-body-lg text-body-lg py-3 rounded-full font-bold relative z-10 active:scale-95 transition-transform flex items-center justify-center gap-2">
                    今すぐ投資を始める
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </section>
                <div className="zen-divider" />
              </>
            )}

            {/* Trending Stocks */}
            <TrendingStocks stocks={HOT_STOCKS} onStockClick={(code, name) => handleStockSelect(code, name)} />

            <div className="zen-divider" />

            {/* Comparison */}
            <ComparisonSection />
          </>
        ) : (
          <InlineLoadingScene isVisible={showLoadingScene} />
        )}
      </main>

      <Footer />

      <DiagnosisModal
        isOpen={diagnosisState === 'streaming' || diagnosisState === 'results'}
        onClose={closeModal} analysis={analysisResult}
        stockCode={inputValue} stockName={stockData?.info.name || inputValue}
        onLineConversion={handleLineConversion} onReportDownload={handleReportDownload}
        isStreaming={diagnosisState === 'streaming'} isConnecting={diagnosisState === 'connecting'}
      />
    </div>
  );
}
