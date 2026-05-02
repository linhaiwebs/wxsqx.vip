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

      {/* Header — matches Stitch design exactly */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center h-14 px-2 bg-white border-b-3 border-zinc-950 font-display font-black uppercase tracking-tighter" style={{ borderBottomWidth: '3px', boxShadow: '4px 4px 0px 0px #000000' }}>
        <button className="w-10 h-10 flex items-center justify-center text-cx-lime hover:bg-cx-lime hover:text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none brutal-border brutal-shadow bg-cx-navy">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <span className="text-lg font-black italic text-zinc-950">CXBWX</span>
        <button className="w-10 h-10 flex items-center justify-center text-cx-lime hover:bg-cx-lime hover:text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none brutal-border brutal-shadow bg-cx-navy">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </header>

      <main className="flex-grow pt-20 pb-8 px-2 flex flex-col gap-3 max-w-md mx-auto w-full">
        {!showLoadingScene ? (
          <>
            <EnhancedTitle />

            <SimpleInputContainer>
              <ModernStockInput value={inputValue} onChange={setInputValue} onStockSelect={handleStockSelect} autoSelectFirst={isUrlAutoSelectRef.current} />

              {loading && (
                <div className="text-center py-3 animate-fadeIn">
                  <div className="inline-block animate-spin h-8 w-8 brutal-border border-t-cx-pink" style={{ borderWidth: '3px', borderStyle: 'solid', borderColor: '#001c3a', borderTopColor: '#e4006c' }}></div>
                  <p className="mt-2 text-cx-outline font-display text-[10px] uppercase" style={{ fontWeight: 700 }}>LOADING...</p>
                </div>
              )}

              {error && diagnosisState !== 'error' && (
                <div className="bg-cx-surface-container border-l-4 border-cx-pink p-2 text-center animate-fadeIn mt-2">
                  <p className="text-cx-pink text-xs font-body" style={{ fontWeight: 700 }}>{error}</p>
                </div>
              )}

              {!loading && diagnosisState === 'initial' && (
                <ModernActionButton onClick={runDiagnosis} disabled={!inputValue || !stockCode} />
              )}

              {diagnosisState === 'error' && (
                <div className="bg-cx-surface-lowest brutal-border p-4 text-center animate-fadeIn mt-2" style={{ boxShadow: '4px 4px 0px 0px #001c3a' }}>
                  <h3 className="font-display text-2xl text-cx-error uppercase mb-2" style={{ fontWeight: 800 }}>ERROR</h3>
                  <p className="text-cx-on-surface-variant text-sm mb-4 whitespace-pre-line font-body">{error}</p>
                  <button onClick={() => { setDiagnosisState('initial'); setError(null); }}
                    className="px-6 py-3 bg-cx-lime text-cx-navy brutal-border brutal-shadow brutal-shadow-hover brutal-shadow-active font-display font-bold uppercase text-sm transition-all">
                    もう一度試す
                  </button>
                </div>
              )}
            </SimpleInputContainer>

            {/* Info Cards Grid */}
            <section className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-cx-surface-high brutal-border brutal-shadow p-2 flex flex-col gap-2 relative group hover:bg-cx-yellow-bright transition-colors">
                <div className="bg-cx-yellow-dim w-8 h-8 brutal-border flex items-center justify-center absolute -top-3 -left-3 z-10 group-hover:rotate-12 transition-transform" style={{ boxShadow: '2px 2px 0px 0px #001c3a', borderWidth: '2px' }}>
                  <svg className="w-4 h-4 text-cx-navy" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                <h3 className="font-body text-[11px] bg-white brutal-border inline-block px-1 w-fit mt-1" style={{ fontWeight: 800, borderWidth: '2px' }}>丑萌（ブサかわ）とは？</h3>
                <p className="font-body text-[10px] text-cx-on-surface-variant leading-tight" style={{ fontWeight: 700 }}>不細工だけど愛くるしい。不完全さが生む不思議な魅力。</p>
              </div>
              <div className="bg-cx-surface-high brutal-border brutal-shadow p-2 flex flex-col gap-2 relative group hover:bg-cx-lime transition-colors">
                <div className="bg-cx-lime-dim w-8 h-8 brutal-border flex items-center justify-center absolute -top-3 -right-3 z-10 group-hover:-rotate-12 transition-transform" style={{ boxShadow: '2px 2px 0px 0px #001c3a', borderWidth: '2px' }}>
                  <svg className="w-4 h-4 text-cx-navy" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
                </div>
                <h3 className="font-body text-[11px] bg-white brutal-border inline-block px-1 w-fit mt-1" style={{ fontWeight: 800, borderWidth: '2px' }}>ラボについて</h3>
                <p className="font-body text-[10px] text-cx-on-surface-variant leading-tight" style={{ fontWeight: 700 }}>あなたの「バイブス」を分析して、ぴったりのモンスターを特定。</p>
              </div>
              <div className="col-span-2 bg-cx-inverse text-cx-inverse-text brutal-border brutal-shadow p-2 flex items-center gap-3">
                <div className="w-12 h-12 bg-white brutal-border flex-shrink-0 flex items-center justify-center" style={{ borderWidth: '2px' }}>
                  <svg className="w-6 h-6 text-cx-pink" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-body text-[10px] text-cx-lime" style={{ fontWeight: 700 }}>警告：</span>
                  <span className="font-body text-xs text-white leading-tight" style={{ fontWeight: 700 }}>結果はデタラメかもしれないし、深刻に個人的かもしれません。</span>
                </div>
              </div>
            </section>
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
