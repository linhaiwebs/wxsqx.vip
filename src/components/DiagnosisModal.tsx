import { X, ExternalLink, Loader2 } from 'lucide-react';
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
      <div className="border-2 border-kw-white bg-kw-bg p-4 relative z-10 overflow-hidden w-full max-w-[400px]" style={{ boxShadow: '4px 4px 0 0 #d2f000' }}>
        {/* RESULT badge */}
        <div className="absolute top-0 right-0 bg-kw-white text-kw-bg font-display text-xs px-2 py-1 border-b-2 border-l-2 border-kw-white uppercase font-bold" style={{ letterSpacing: '0.1em' }}>RESULT</div>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-4 mt-2">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-kw-accent" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
            <h3 className="font-display text-lg text-kw-on-bg uppercase leading-none" style={{ fontWeight: 700 }}>{stockName}（{stockCode}）</h3>
          </div>
          <button onClick={onClose} className="text-kw-outline-variant hover:text-kw-on-bg transition-colors"><X className="w-5 h-5" /></button>
        </div>
        {/* Content */}
        <div ref={contentRef} className="flex flex-col gap-2 overflow-y-auto max-h-[50vh] text-left">
          {isConnecting ? (
            <div className="text-center py-6">
              <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3 text-kw-accent" />
              <p className="font-display text-kw-accent uppercase tracking-wider" style={{ fontWeight: 700 }}>SCANNING...</p>
            </div>
          ) : (
            <>
              <div className="border border-kw-outline-variant p-3 bg-kw-surface-low mb-2 relative">
                <div className="text-xs text-kw-outline mb-1 font-mono uppercase">免責事項:</div>
                <div className="font-display text-base text-kw-error uppercase" style={{ fontWeight: 700 }}>⚠️ 投資助言ではありません</div>
              </div>
              <div className="bg-kw-surface-highest p-3">
                <AnalysisRenderer text={analysis} />
                {isStreaming && <span className="inline-block w-2 h-4 animate-pulse ml-1 bg-kw-accent"></span>}
              </div>
              <button onClick={onLineConversion} className="w-full bg-kw-accent text-black font-display text-base py-4 border-2 border-kw-accent uppercase hover:bg-black hover:text-kw-accent hover:border-kw-accent active:bg-kw-accent active:text-black transition-colors flex justify-between items-center px-4 group mt-2">
                <span>詳細レポートを見る</span>
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
              </button>
              <div className="border border-kw-outline-variant bg-kw-surface-container p-2 mt-1">
                <p className="text-xs text-kw-on-surface-variant font-body leading-snug"><span className="text-kw-accent font-bold">✓</span> 現在無料 <span className="mx-1">|</span> <span className="text-kw-accent font-bold">✓</span> LINE友だち追加で定期配信</p>
              </div>
              {/* Abstract bars */}
              <div className="mt-2 flex gap-1 justify-end opacity-50">
                <div className="w-8 h-2 bg-kw-white"></div>
                <div className="w-2 h-2 bg-kw-accent"></div>
                <div className="w-16 h-2 bg-kw-white"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
