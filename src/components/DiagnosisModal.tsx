import { X, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import AnalysisRenderer from './AnalysisRenderer';

interface DiagnosisModalProps { isOpen: boolean; onClose: () => void; analysis: string; stockCode: string; stockName: string; onLineConversion: () => void; onReportDownload: () => void; isStreaming?: boolean; isConnecting?: boolean; }

export default function DiagnosisModal({ isOpen, onClose, analysis, stockCode, stockName, onLineConversion, onReportDownload, isStreaming = false, isConnecting = false }: DiagnosisModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (isOpen && contentRef.current) contentRef.current.scrollTop = 0; }, [isOpen]);
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed'; document.body.style.top = `-${scrollY}px`; document.body.style.width = '100%'; document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-modal-open', 'true');
      return () => { document.body.style.position = ''; document.body.style.top = ''; document.body.style.width = ''; document.body.style.overflow = ''; document.body.removeAttribute('data-modal-open'); window.scrollTo(0, scrollY); };
    }
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3" style={{ touchAction: 'none' }}>
      <div className="bg-mb-surface-highest border border-mb-outline-variant p-4 relative z-10 overflow-hidden w-full max-w-[400px] pixel-corner">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-mb-error z-20"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-mb-error z-20"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-mb-error z-20"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-mb-error z-20"></div>
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-mb-surface/80 backdrop-blur-md z-0"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-4 mt-2">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-mb-error" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
              <h3 className="font-display text-lg text-mb-on-bg uppercase leading-none" style={{ fontWeight: 700 }}>{stockName}（{stockCode}）</h3>
            </div>
            <button onClick={onClose} className="text-mb-outline hover:text-mb-on-bg transition-colors"><X className="w-5 h-5" /></button>
          </div>
          <div ref={contentRef} className="flex flex-col gap-2 overflow-y-auto max-h-[50vh] text-left">
            {isConnecting ? (
              <div className="text-center py-6">
                <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3 text-mb-pink" />
                <p className="font-display text-mb-error uppercase tracking-wider" style={{ fontWeight: 700, textShadow: '0 0 10px rgba(255,180,171,0.5)' }}>DIAGNOSING...</p>
              </div>
            ) : (
              <>
                <div className="border border-mb-outline-variant p-3 bg-mb-surface-container mb-2 relative">
                  <div className="text-[10px] text-mb-error mb-1 font-mono uppercase animate-pulse">SYS_WARN_OVERRIDE</div>
                  <div className="font-display text-base text-mb-error uppercase" style={{ fontWeight: 700 }}>⚠️ 投資助言ではありません</div>
                </div>
                <div className="bg-mb-surface-highest p-3">
                  <AnalysisRenderer text={analysis} />
                  {isStreaming && <span className="inline-block w-2 h-4 animate-pulse ml-1 bg-mb-cyan"></span>}
                </div>
                <button onClick={onLineConversion} className="mt-4 w-full bg-mb-magenta text-white font-display text-2xl py-2 border-2 border-mb-pink uppercase tracking-widest pixel-corner hover:bg-mb-pink transition-colors flex justify-center items-center gap-2" style={{ fontWeight: 700 }}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  JOIN THE CORE
                </button>
                <div className="border border-mb-outline-variant bg-mb-surface-container p-2 mt-1">
                  <p className="font-mono text-[10px] text-mb-on-surface-variant"><span className="text-mb-cyan">✓</span> 現在無料 <span className="mx-1">|</span> <span className="text-mb-cyan">✓</span> LINE友だち追加で定期配信</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
