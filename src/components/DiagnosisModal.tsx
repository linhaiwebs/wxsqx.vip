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
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-3" style={{ touchAction: 'none' }}>
      <div className="w-full max-w-[400px] border-2 border-cbx-white bg-cbx-surface-lowest p-4 flex flex-col gap-3 relative" style={{ boxShadow: '8px 8px 0px 0px #CCFF00' }}>
        <button onClick={onClose} className="absolute top-2 right-2 text-cbx-white hover:bg-cbx-lime hover:text-black p-1 transition-colors z-10">
          <X className="w-5 h-5" />
        </button>
        <h2 className="font-display text-[22px] sm:text-[24px] text-cbx-white uppercase border-b-2 border-cbx-white pb-2 pr-10" style={{ letterSpacing: '-0.02em', fontWeight: 800 }}>{stockName}（{stockCode}）解析結果</h2>
        <div ref={contentRef} className="flex flex-col gap-2 overflow-y-auto max-h-[60vh]">
          {isConnecting ? (
            <div className="text-center py-6">
              <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3 text-cbx-lime" />
              <p className="font-display text-cbx-lime uppercase tracking-wider" style={{ fontWeight: 800 }}>ANALYZING...</p>
            </div>
          ) : (
            <>
              <div className="bg-cbx-surface-container border-l-2 border-cbx-lime p-2">
                <p className="text-xs text-cbx-pink leading-snug font-body font-bold">⚠️ 免責事項：この分析は参考情報のみであり、投資助言ではありません。</p>
              </div>
              <div className="bg-cbx-surface-highest border border-cbx-outline-variant p-3">
                <AnalysisRenderer text={analysis} />
                {isStreaming && <span className="inline-block w-2 h-4 animate-pulse ml-1 bg-cbx-lime"></span>}
              </div>
              <button onClick={onLineConversion} className="mt-2 w-full bg-cbx-lime text-black font-body text-xs uppercase py-3 border-2 border-black hover:bg-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:bg-cbx-blue-light transition-all flex justify-center items-center gap-2" style={{ letterSpacing: '0.1em', fontWeight: 700, boxShadow: '4px 4px 0px 0px #0448ff' }}>
                <span>LINEでレポートを受け取る</span><ExternalLink className="w-4 h-4" />
              </button>
              <div className="mt-1 border border-cbx-outline-variant bg-cbx-surface-container p-2">
                <p className="text-xs text-cbx-on-surface-variant font-body leading-snug"><span className="text-cbx-lime font-bold">✓</span> 現在無料 <span className="mx-1">|</span> <span className="text-cbx-lime font-bold">✓</span> LINE友だち追加で定期配信</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
