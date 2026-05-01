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
      <div className="relative bg-qsdj-surface border-4 border-qsdj-on-bg shadow-hard-lg w-full max-w-md transform rotate-1">
        <div className="absolute -top-5 -left-3 bg-qsdj-teal text-white px-4 py-1 border-4 border-qsdj-on-bg -rotate-6 shadow-hard z-20">
          <span className="font-label text-sm font-bold uppercase tracking-wider">Result</span>
        </div>
        <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-qsdj-magenta border-4 border-qsdj-on-bg shadow-hard-sm active:translate-y-1 active:translate-x-1 active:shadow-none transition-all z-10">
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="p-6 pt-8">
          <div className="text-center mb-4">
            <h2 className="font-display text-2xl font-black text-qsdj-on-bg inline-block bg-qsdj-magenta text-white px-3 py-1 border-4 border-qsdj-on-bg shadow-hard-sm -skew-x-3">
              {stockName}（{stockCode}）AI分析
            </h2>
          </div>

          <div ref={contentRef} className="overflow-y-auto max-h-[55vh]">
            {isConnecting ? (
              <div className="text-center py-8">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-qsdj-magenta-dark" />
                <p className="font-display font-black text-qsdj-on-bg uppercase tracking-wider">AI分析中...</p>
              </div>
            ) : (
              <>
                <div className="bg-qsdj-surface-container border-4 border-qsdj-on-bg shadow-hard-sm p-4 mb-4">
                  <div className="bg-qsdj-magenta/10 border-l-4 border-qsdj-magenta p-2 mb-3">
                    <p className="text-xs text-qsdj-magenta-dark leading-snug font-bold font-body">
                      ⚠️ 免責事項：この分析は参考情報のみであり、投資助言ではありません。
                    </p>
                  </div>
                  <AnalysisRenderer text={analysis} />
                  {isStreaming && <span className="inline-block w-2 h-4 animate-pulse ml-1 bg-qsdj-magenta"></span>}
                </div>

                <button onClick={onLineConversion} className="w-full bg-qsdj-lime text-qsdj-lime-dark border-4 border-qsdj-on-bg shadow-hard p-4 font-display text-xl font-extrabold transform -rotate-1 hover:bg-[#d4ff00] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all flex justify-center items-center gap-2">
                  <span>LINEでレポートを受け取る</span>
                  <ExternalLink className="w-5 h-5" />
                </button>

                <div className="mt-3 border-4 border-qsdj-on-bg bg-qsdj-surface-low p-2">
                  <p className="text-xs text-qsdj-on-surface-variant font-body leading-snug">
                    <span className="text-qsdj-teal font-bold">✓</span> 現在無料
                    <span className="mx-1">|</span>
                    <span className="text-qsdj-teal font-bold">✓</span> LINE友だち追加で定期配信
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
