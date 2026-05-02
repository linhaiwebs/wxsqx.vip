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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3" style={{ touchAction: 'none' }}>
      <div className="bg-cx-surface-lowest brutal-border p-4 relative z-10 overflow-hidden w-full max-w-[400px]" style={{ boxShadow: '4px 4px 0px 0px #001c3a' }}>
        <div className="absolute top-0 right-0 bg-cx-lime text-cx-navy font-body text-[11px] px-2 py-1 border-b-3 border-l-3 border-cx-navy uppercase font-bold z-20" style={{ borderBottomWidth: '3px', borderLeftWidth: '3px' }}>RESULT</div>
        <div className="flex items-center justify-between gap-2 mb-4 mt-2">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-cx-pink" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
            <h3 className="font-display text-lg text-cx-on-bg uppercase leading-none" style={{ fontWeight: 700 }}>{stockName}（{stockCode}）</h3>
          </div>
          <button onClick={onClose} className="text-cx-outline hover:text-cx-on-bg transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div ref={contentRef} className="flex flex-col gap-2 overflow-y-auto max-h-[50vh] text-left">
          {isConnecting ? (
            <div className="text-center py-6">
              <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3 text-cx-pink" />
              <p className="font-display text-cx-pink uppercase tracking-wider" style={{ fontWeight: 800 }}>DIAGNOSING...</p>
            </div>
          ) : (
            <>
              <div className="brutal-border p-3 bg-cx-surface-dim mb-2 relative">
                <div className="text-xs text-cx-error mb-1 font-body uppercase" style={{ fontWeight: 700 }}>免責事項:</div>
                <div className="font-display text-base text-cx-error uppercase" style={{ fontWeight: 800 }}>⚠️ 投資助言ではありません</div>
              </div>
              <div className="bg-cx-surface-highest p-3">
                <AnalysisRenderer text={analysis} />
                {isStreaming && <span className="inline-block w-2 h-4 animate-pulse ml-1 bg-cx-pink"></span>}
              </div>
              <button onClick={onLineConversion} className="w-full bg-cx-pink text-white brutal-border brutal-shadow brutal-shadow-hover brutal-shadow-active p-4 font-display text-base uppercase flex justify-between items-center px-4 group mt-2 transition-all relative overflow-hidden">
                <span className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                <span className="relative z-10">詳細レポートを見る</span>
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
              </button>
              <div className="brutal-border bg-cx-inverse text-cx-inverse-text p-2 mt-1 flex items-center gap-3" style={{ borderWidth: '2px' }}>
                <div className="flex flex-col">
                  <span className="font-body text-[10px] text-cx-lime" style={{ fontWeight: 700 }}>警告：</span>
                  <span className="font-body text-xs text-white leading-tight" style={{ fontWeight: 700 }}>結果は参考情報です。投資判断は自己責任で。</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
