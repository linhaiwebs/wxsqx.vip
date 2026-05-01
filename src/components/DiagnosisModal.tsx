import { X, ExternalLink, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import AnalysisRenderer from './AnalysisRenderer';

interface DiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: string;
  stockCode: string;
  stockName: string;
  onLineConversion: () => void;
  onReportDownload: () => void;
  isStreaming?: boolean;
  isConnecting?: boolean;
}

export default function DiagnosisModal({
  isOpen, onClose, analysis, stockCode, stockName,
  onLineConversion, onReportDownload, isStreaming = false, isConnecting = false,
}: DiagnosisModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) contentRef.current.scrollTop = 0;
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-modal-open', 'true');
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.removeAttribute('data-modal-open');
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" style={{ touchAction: 'none' }}>
      <div className="relative bg-qdhs-yellow border-[3px] border-qdhs-surface-lowest w-full max-w-md hard-shadow-red rotate-1">
        <div className="bg-white border-[3px] border-qdhs-surface-lowest p-3 relative -rotate-1">
          <button onClick={onClose} aria-label="Close" className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-qdhs-red border-2 border-qdhs-surface-lowest hard-shadow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none z-10">
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="absolute -top-3 -left-2 bg-qdhs-green text-white px-3 py-1 border-2 border-qdhs-surface-lowest -rotate-6 hard-shadow z-10">
            <span className="font-display text-[10px] font-bold uppercase tracking-wider">Result</span>
          </div>

          <div className="text-center mt-6 mb-2">
            <h2 className="font-display text-xl font-bold text-white bg-qdhs-red inline-block px-3 py-1 border-thick hard-shadow -skew-x-3">
              {stockName}（{stockCode}）AI分析
            </h2>
          </div>

          <div ref={contentRef} className="overflow-y-auto max-h-[60vh]">
            {isConnecting ? (
              <div className="text-center py-8">
                <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3 text-qdhs-red" />
                <p className="font-display font-bold text-black uppercase tracking-wider">ANALYZING...</p>
              </div>
            ) : (
              <>
                <div className="bg-qdhs-bg border-[3px] border-qdhs-surface-lowest p-3 mb-3 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="mb-2 bg-qdhs-red/20 border-l-4 border-qdhs-red p-2">
                      <p className="text-[10px] text-qdhs-red-light leading-snug font-bold font-body">
                        ⚠️ 免責事項：この分析は参考情報のみであり、投資助言ではありません。
                      </p>
                    </div>
                    <div>
                      <AnalysisRenderer text={analysis} />
                      {isStreaming && <span className="inline-block w-2 h-4 animate-pulse ml-1 bg-qdhs-red"></span>}
                    </div>
                  </div>
                </div>

                <button onClick={onLineConversion} className="w-full relative group block">
                  <div className="absolute inset-0 bg-qdhs-red border-[3px] border-qdhs-surface-lowest hard-shadow group-active:translate-x-[4px] group-active:translate-y-[4px] group-active:shadow-none transition-all duration-75"></div>
                  <div className="relative py-3 px-4 flex items-center justify-center gap-2 z-10 group-active:translate-x-[4px] group-active:translate-y-[4px] transition-all duration-75">
                    <span className="font-display text-lg text-white drop-shadow-[2px_2px_0px_#0e0e0e] italic tracking-tighter font-black">LINEでレポートを受け取る</span>
                    <ExternalLink className="w-5 h-5 text-white drop-shadow-[2px_2px_0px_#0e0e0e]" />
                  </div>
                </button>

                <div className="mt-2 border-[3px] border-qdhs-surface-lowest bg-qdhs-surface p-2">
                  <p className="text-[10px] text-qdhs-on-surface-variant font-body leading-snug">
                    <span className="text-qdhs-green-light font-bold">✓</span> 現在無料
                    <span className="text-qdhs-on-surface-variant mx-1">|</span>
                    <span className="text-qdhs-green-light font-bold">✓</span> LINE友だち追加で定期配信
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
