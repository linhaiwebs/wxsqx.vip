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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-3" style={{ touchAction: 'none' }}>
      <div className="glass-panel rounded-xl p-5 w-full max-w-[400px] flex flex-col gap-3 border-l-4 border-l-xb-secondary relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-5">
          <svg className="w-24 h-24 text-xb-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
        </div>
        <div className="flex items-center gap-3 z-10">
          <div className="bg-xb-secondary-container text-xb-on-bg w-10 h-10 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-xb-secondary" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </div>
          <div className="flex-1">
            <h3 className="font-display text-[16px] text-xb-on-bg" style={{ fontWeight: 700 }}>{stockName}（{stockCode}）</h3>
            <span className="font-body text-[11px] text-xb-on-surface-variant" style={{ fontWeight: 600, letterSpacing: '0.05em' }}>診断結果</span>
          </div>
          <button onClick={onClose} className="text-xb-outline hover:text-xb-on-bg transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div ref={contentRef} className="flex flex-col gap-2 overflow-y-auto max-h-[50vh] text-left z-10">
          {isConnecting ? (
            <div className="text-center py-6">
              <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3 text-xb-primary" />
              <p className="font-display text-xb-primary" style={{ fontWeight: 700 }}>診断中...</p>
            </div>
          ) : (
            <>
              <div className="bg-xb-error-container border border-xb-outline-variant p-3 rounded-lg">
                <p className="font-body text-sm text-xb-error" style={{ fontWeight: 600 }}>⚠️ 投資助言ではありません</p>
              </div>
              <div className="bg-white/40 p-3 rounded-lg">
                <AnalysisRenderer text={analysis} />
                {isStreaming && <span className="inline-block w-2 h-4 animate-pulse ml-1 bg-xb-primary"></span>}
              </div>
              <button onClick={onLineConversion} className="w-full bg-xb-surface-tint text-white font-body font-semibold rounded-lg h-11 mt-1 hover:bg-xb-primary transition-colors flex justify-center items-center gap-2">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                プレミアムに参加して詳細を見る
              </button>
              <div className="bg-white/30 p-2 rounded-lg">
                <p className="font-body text-[11px] text-xb-on-surface-variant text-center"><span className="text-xb-secondary">✓</span> 現在無料 <span className="mx-1">|</span> <span className="text-xb-secondary">✓</span> LINE友だち追加で定期配信</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
