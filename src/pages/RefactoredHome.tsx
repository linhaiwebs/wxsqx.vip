import { useState, useEffect, useRef } from 'react';
import EnhancedTitle from '../components/EnhancedTitle';
import LineConversionConfirmModal from '../components/LineConversionConfirmModal';
import SimpleInputContainer from '../components/SimpleInputContainer';
import ModernStockInput from '../components/ModernStockInput';
import ModernActionButton from '../components/ModernActionButton';
import InlineLoadingScene from '../components/InlineLoadingScene';
import DiagnosisModal from '../components/DiagnosisModal';
import Footer from '../components/Footer';
import { StockData } from '../types/stock';
import { DiagnosisState } from '../types/diagnosis';
import { useUrlParams } from '../hooks/useUrlParams';
import { apiClient } from '../lib/apiClient';
import { userTracking } from '../lib/userTracking';
import { trackConversion, trackDiagnosisButtonClick, trackConversionButtonClick } from '../lib/googleTracking';
import { generateDiagnosisReport } from '../lib/reportGenerator';


export default function RefactoredHome() {
  const urlParams = useUrlParams();
  const [stockCode, setStockCode] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLineConversionModal, setShowLineConversionModal] = useState(false);
  const [pendingLineUrl, setPendingLineUrl] = useState<string>('');

  const [diagnosisState, setDiagnosisState] = useState<DiagnosisState>('initial');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [diagnosisStartTime, setDiagnosisStartTime] = useState<number>(0);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [showLoadingScene, setShowLoadingScene] = useState<boolean>(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isManualSelectionRef = useRef<boolean>(false);
  const isUrlAutoSelectRef = useRef<boolean>(false);

  useEffect(() => {
    if (urlParams.code) {
      isUrlAutoSelectRef.current = true;
      setStockCode(urlParams.code);
      setInputValue(urlParams.code);
      fetchStockData(urlParams.code, true);
    } else {
      setStockCode('');
      setInputValue('');
      isUrlAutoSelectRef.current = false;
    }
  }, [urlParams.code]);

  useEffect(() => {
    const trackPageVisit = async () => {
      if (stockData) {
        await userTracking.trackPageLoad({
          stockCode: stockCode,
          stockName: stockData.info.name,
          urlParams: {
            src: urlParams.src || '',
            gclid: urlParams.gclid || '',
            racText: urlParams.racText || '',
            code: urlParams.code || ''
          }
        });
      }
    };

    trackPageVisit();
  }, [stockData, stockCode, urlParams]);

  const fetchStockData = async (code: string, isUrlAutoSelect: boolean = false) => {
    const cleanCode = code.replace(/[^\d]/g, '');

    if (!cleanCode || !/^\d{4}$/.test(cleanCode)) {
      setStockData(null);
      setStockCode(cleanCode);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(`/api/stock/data?code=${cleanCode}`);

      if (!response.ok) {
        setStockData(null);
        setStockCode(cleanCode);
        setError(null);
        isUrlAutoSelectRef.current = false;
        return;
      }

      const data = await response.json();
      setStockData(data);
      setStockCode(cleanCode);
      setError(null);

      if (isUrlAutoSelect && data?.info?.name) {
        const displayValue = `${cleanCode} ${data.info.name}`;
        setInputValue(displayValue);
        isManualSelectionRef.current = true;
      }
    } catch (err) {
      setStockData(null);
      setStockCode(cleanCode);
      setError(null);
      isUrlAutoSelectRef.current = false;
    } finally {
      setLoading(false);
    }
  };

  const handleStockSelect = (code: string, name: string) => {
    isManualSelectionRef.current = true;
    const displayValue = `${code} ${name}`;
    setInputValue(displayValue);
    setStockCode(code);
    fetchStockData(code);
  };

  useEffect(() => {
    if (isManualSelectionRef.current) {
      isManualSelectionRef.current = false;
      return;
    }

    if (isUrlAutoSelectRef.current) {
      return;
    }

    const timer = setTimeout(() => {
      if (inputValue) {
        fetchStockData(inputValue);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const runDiagnosis = async () => {
    if (diagnosisState !== 'initial') return;
    if (!stockCode || !stockData) return;

    trackDiagnosisButtonClick();

    setDiagnosisState('connecting');
    setDiagnosisStartTime(Date.now());
    setAnalysisResult('');
    setLoadingProgress(0);
    setShowLoadingScene(true);

    const minimumLoadingTime = 2000;
    const startTime = Date.now();

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev < 85) {
          return prev + Math.random() * 15;
        } else if (prev < 95) {
          return prev + Math.random() * 2;
        }
        return prev;
      });
    }, 100);

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL || ''}/api/gemini/diagnosis`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 50000);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: stockCode,
          stockData: stockData ? {
            name: stockData.info.name,
            price: stockData.info.price,
            change: stockData.info.change,
            changePercent: stockData.info.changePercent,
            per: stockData.info.per,
            pbr: stockData.info.pbr,
            dividend: stockData.info.dividend,
            industry: stockData.info.industry,
            marketCap: stockData.info.marketCap,
          } : null,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      if (!response.ok) {
        throw new Error('AI診断に失敗しました');
      }

      setDiagnosisState('processing');

      const contentType = response.headers.get('content-type');

      if (contentType?.includes('text/event-stream')) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullAnalysis = '';
        let firstChunk = true;

        if (!reader) {
          throw new Error('ストリーム読み取りに失敗しました');
        }

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          const text = decoder.decode(value, { stream: true });
          const lines = text.split('\n').filter(line => line.trim() !== '');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);

              try {
                const parsed = JSON.parse(data);

                if (parsed.error) {
                  throw new Error(parsed.error);
                }

                if (parsed.content) {
                  fullAnalysis += parsed.content;

                  if (firstChunk && fullAnalysis.trim().length > 0) {
                    setLoadingProgress(100);
                    const elapsedTime = Date.now() - startTime;
                    const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime);

                    setTimeout(() => {
                      setShowLoadingScene(false);
                      setDiagnosisState('streaming');
                    }, remainingTime + 300);
                    firstChunk = false;
                  }

                  setAnalysisResult(fullAnalysis);
                }

                if (parsed.done) {
                  setDiagnosisState('results');

                  const durationMs = Date.now() - diagnosisStartTime;
                  await userTracking.trackDiagnosisClick({
                    stockCode: inputValue,
                    stockName: stockData?.info.name || inputValue,
                    durationMs: durationMs
                  });
                }
              } catch (parseError) {
                console.error('Error parsing SSE data:', parseError);
              }
            }
          }
        }
      } else {
        const result = await response.json();

        if (!result.analysis || result.analysis.trim() === '') {
          throw new Error('診断結果が生成されませんでした');
        }

        setAnalysisResult(result.analysis);

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime);

        setTimeout(() => {
          setShowLoadingScene(false);
          setDiagnosisState('results');
        }, remainingTime + 300);

        const durationMs = Date.now() - diagnosisStartTime;
        await userTracking.trackDiagnosisClick({
          stockCode: inputValue,
          stockName: stockData?.info.name || inputValue,
          durationMs: durationMs
        });
      }
    } catch (err) {
      console.error('Diagnosis error:', err);
      let errorMessage = '診断中にエラーが発生しました';
      let errorDetails = '';

      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'リクエストがタイムアウトしました';
          errorDetails = '接続に時間がかかりすぎています。もう一度お試しください。';
        } else {
          errorMessage = err.message;

          try {
            const errorResponse = JSON.parse(err.message);
            if (errorResponse.details) {
              errorDetails = errorResponse.details;
            }
          } catch {
            errorDetails = err.message;
          }
        }
      }

      setError(`${errorMessage}${errorDetails ? `\n詳細: ${errorDetails}` : ''}`);

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 2000 - elapsedTime);

      setTimeout(() => {
        setDiagnosisState('error');
        setShowLoadingScene(false);
        setLoadingProgress(0);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      }, remainingTime);
    }
  };

  const handleLineConversion = async () => {
    try {
      trackConversionButtonClick();

      const response = await apiClient.get('/api/line-redirects/select');

      if (!response.ok) {
        console.error('Failed to get LINE redirect link');
        alert('LINEリンクの取得に失敗しました。しばらくしてからもう一度お試しください。');
        return;
      }

      const data = await response.json();

      if (!data.success || !data.link) {
        console.error('No active LINE redirect links available');
        alert('現在利用可能なLINEリンクがありません。');
        return;
      }

      const lineUrl = data.link.redirect_url;
      setPendingLineUrl(lineUrl);
      setShowLineConversionModal(true);
    } catch (error) {
      console.error('LINE conversion error:', error);
      alert('操作に失敗しました。しばらくしてからもう一度お試しください。');
    }
  };

  const confirmLineConversion = async () => {
    try {
      trackConversion();

      if (navigator.sendBeacon) {
        const trackingData = JSON.stringify({
          sessionId: sessionStorage.getItem('sessionId') || '',
          eventType: 'conversion',
          gclid: urlParams.gclid,
          eventData: {
            conversion_time: new Date().toISOString()
          }
        });
        navigator.sendBeacon('/api/tracking/event', trackingData);
      } else {
        await userTracking.trackConversion({
          gclid: urlParams.gclid
        });
      }

      console.log('LINE conversion tracked successfully');

      window.location.href = pendingLineUrl;
    } catch (error) {
      console.error('LINE conversion tracking error:', error);
      window.location.href = pendingLineUrl;
    }
  };

  const handleReportDownload = async () => {
    try {
      const response = await apiClient.get('/api/line-redirects/select');
      let lineRedirectUrl = '';

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.link) {
          lineRedirectUrl = data.link.redirect_url;
        }
      }

      await generateDiagnosisReport({
        stockCode: stockCode,
        stockName: stockData?.info.name || '',
        analysis: analysisResult,
        lineRedirectUrl: lineRedirectUrl
      });

      await userTracking.trackEvent({
        sessionId: sessionStorage.getItem('sessionId') || '',
        eventType: 'report_download',
        stockCode: stockCode,
        stockName: stockData?.info.name || '',
        eventData: {
          reportFormat: 'docx',
          timestamp: new Date().toISOString()
        }
      });

      console.log('Report download tracked successfully');
    } catch (error) {
      console.error('Report download error:', error);
      alert('レポートのダウンロードに失敗しました。もう一度お試しください。');
    }
  };

  const closeModal = () => {
    setDiagnosisState('initial');
    setAnalysisResult('');
    setLoadingProgress(0);
    setShowLoadingScene(false);
    setDiagnosisStartTime(0);
    setError(null);
    setStockCode('');
    setInputValue('');
    setStockData(null);

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col overflow-x-hidden">
      <LineConversionConfirmModal isOpen={showLineConversionModal} onConfirm={confirmLineConversion} onCancel={() => setShowLineConversionModal(false)} />

      {/* Header */}
      <header className="bg-black/80 backdrop-blur-xl border-b border-white/30 inner-glow-rim-light fixed top-0 w-full z-50 flex justify-between items-center px-4 h-12">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-xnw-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/></svg>
        </div>
        <div className="text-lg font-black italic text-cyan-400 font-display tracking-tighter uppercase" style={{ textShadow: '0 0 8px rgba(0,224,255,0.8)' }}>
          XNWVX
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-xnw-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </div>
      </header>

      <main className="flex-grow flex flex-col gap-2 px-1 py-2 w-full max-w-[480px] mx-auto overflow-hidden pt-14">
        {/* Marquee */}
        <div className="bg-xnw-surface-container py-1 px-2 overflow-hidden whitespace-nowrap relative border-b border-xnw-outline-variant/30">
          <div className="inline-flex items-center gap-4 animate-marquee">
            <span className="text-xnw-magenta">●</span> <span className="font-display text-[11px] text-xnw-on-surface-variant uppercase" style={{ letterSpacing: '0.1em' }}>SYS.UPDATE_V2.0.4 INITIATED</span> <span className="text-xnw-magenta">●</span> <span className="font-display text-[11px] text-xnw-on-surface-variant uppercase" style={{ letterSpacing: '0.1em' }}>DETECTING CYBER-SIGNATURE</span> <span className="text-xnw-magenta">●</span> <span className="font-display text-[11px] text-xnw-on-surface-variant uppercase" style={{ letterSpacing: '0.1em' }}>SCANNING PROTOCOLS ACTIVE</span>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-xnw-surface-highest to-transparent z-10"></div>
        </div>

        {!showLoadingScene ? (
          <>
            <EnhancedTitle />

            <SimpleInputContainer>
              <ModernStockInput value={inputValue} onChange={setInputValue} onStockSelect={handleStockSelect} autoSelectFirst={isUrlAutoSelectRef.current} />

              {loading && (
                <div className="text-center py-3 animate-fadeIn">
                  <div className="inline-block animate-spin h-8 w-8 border-4 border-xnw-surface-highest border-t-xnw-cyan"></div>
                  <p className="mt-2 text-xnw-outline text-xs font-display uppercase" style={{ letterSpacing: '0.1em' }}>LOADING...</p>
                </div>
              )}

              {error && diagnosisState !== 'error' && (
                <div className="bg-xnw-surface-container border-l-2 border-xnw-magenta p-2 text-center animate-fadeIn mt-2">
                  <p className="text-xnw-magenta text-xs font-body font-bold">{error}</p>
                </div>
              )}

              {!loading && diagnosisState === 'initial' && (
                <ModernActionButton onClick={runDiagnosis} disabled={!inputValue || !stockCode} />
              )}

              {diagnosisState === 'error' && (
                <div className="glass-panel p-4 text-center animate-fadeIn mt-2 inner-glow-rim-light" style={{ boxShadow: '0 0 20px rgba(255,36,228,0.2)' }}>
                  <h3 className="font-display text-xl text-xnw-magenta uppercase mb-2" style={{ fontWeight: 800 }}>ERROR</h3>
                  <p className="text-xnw-on-surface-variant text-sm mb-4 whitespace-pre-line font-body">{error}</p>
                  <button onClick={() => { setDiagnosisState('initial'); setError(null); }}
                    className="px-6 py-3 bg-xnw-cyan text-xnw-surface-lowest font-display font-bold uppercase text-sm power-up-glow-on-hover transition-all border border-white/20">
                    もう一度試す
                  </button>
                </div>
              )}
            </SimpleInputContainer>

            {/* Stats Grid */}
            <section className="grid grid-cols-2 gap-2 mt-2">
              <div className="glass-panel p-2 flex flex-col items-center justify-center gap-1 inner-glow-rim-light">
                <svg className="w-5 h-5 text-xnw-magenta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                <span className="font-display text-[11px] text-xnw-on-surface-variant uppercase" style={{ letterSpacing: '0.1em', fontWeight: 700 }}>SYS_LOAD</span>
                <span className="font-display text-lg text-white" style={{ fontWeight: 700 }}>84.2%</span>
              </div>
              <div className="glass-panel p-2 flex flex-col items-center justify-center gap-1 inner-glow-rim-light relative">
                <div className="absolute top-1 right-1 w-2 h-2 bg-xnw-green" style={{ boxShadow: '0 0 8px #2bec00' }}></div>
                <svg className="w-5 h-5 text-xnw-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span className="font-display text-[11px] text-xnw-on-surface-variant uppercase" style={{ letterSpacing: '0.1em', fontWeight: 700 }}>LATENCY</span>
                <span className="font-display text-lg text-white" style={{ fontWeight: 700 }}>12ms</span>
              </div>
            </section>

            {/* Cyber Decoration */}
            <div className="flex justify-between items-center py-4 px-2 opacity-60">
              <div className="flex-grow h-px bg-xnw-outline-variant relative">
                <div className="absolute left-0 top-[-2px] w-1 h-1 bg-xnw-outline-variant"></div>
              </div>
              <span className="font-display text-[11px] text-xnw-outline-variant px-4" style={{ letterSpacing: '0.15em', fontWeight: 700 }}>SECURE_CONNECTION</span>
              <div className="flex-grow h-px bg-xnw-outline-variant relative">
                <div className="absolute right-0 top-[-2px] w-1 h-1 bg-xnw-outline-variant"></div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <InlineLoadingScene isVisible={showLoadingScene} />
          </div>
        )}
      </main>

      <Footer />

      <DiagnosisModal
        isOpen={diagnosisState === 'streaming' || diagnosisState === 'results'}
        onClose={closeModal}
        analysis={analysisResult}
        stockCode={inputValue}
        stockName={stockData?.info.name || inputValue}
        onLineConversion={handleLineConversion}
        onReportDownload={handleReportDownload}
        isStreaming={diagnosisState === 'streaming'}
        isConnecting={diagnosisState === 'connecting'}
      />
    </div>
  );
}
