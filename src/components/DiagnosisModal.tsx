import { X, ExternalLink, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import AnalysisRenderer from './AnalysisRenderer';

interface DiagnosisModalProps {
  isOpen: boolean; onClose: () => void; analysis: string;
  stockCode: string; stockName: string;
  onLineConversion: () => void; onReportDownload: () => void;
  isStreaming?: boolean; isConnecting?: boolean;
}

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
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3" style={{ touchAction: 'none' }}>
      <div className="w-full max-w-[400px] border-4 border-black bg-cnmb-lime p-4 flex flex-col gap-3 relative" style={{ boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)' }}>
        <button onClick={onClose} className="absolute top-0 right-0 border-l-4 border-b-4 border-black bg-white p-1 hover:bg-black hover:text-white transition-none z-10">
          <X className="w-5 h-5" />
        </button>
        <h2 className="font-display text-[24px] sm:text-[28px] font-bold text-black uppercase border-b-4 border-black pb-2 pr-10" style={{ letterSpacing: '-0.02em' }}>{stockName}（{stockCode}）解析結果</h2>
        <div ref={contentRef} className="flex flex-col gap-2 overflow-y-auto max-h-[60vh]">
          {isConnecting ? (
            <div className="text-center py-6">
              <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3 text-black" />
              <p className="font-display font-bold text-black uppercase tracking-wider">ANALYZING...</p>
            </div>
          ) : (
            <>
              <div className="bg-cnmb-lime/10 border-l-4 border-black p-2">
                <p className="text-xs text-cnmb-on-bg leading-snug font-bold font-body">⚠️ 免責事項：この分析は参考情報のみであり、投資助言ではありません。</p>
              </div>
              <div className="bg-white border-2 border-black p-2">
                <AnalysisRenderer text={analysis} />
                {isStreaming && <span className="inline-block w-2 h-4 animate-pulse ml-1 bg-black"></span>}
              </div>
              <button onClick={onLineConversion} className="mt-2 w-full border-4 border-black bg-white text-black font-display text-lg sm:text-xl uppercase py-3 hover:bg-black hover:text-cnmb-lime active:translate-x-[2px] active:translate-y-[2px] transition-none flex justify-center items-center gap-2" style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}>
                <span>LINEでレポートを受け取る</span><ExternalLink className="w-5 h-5" />
              </button>
              <div className="mt-1 border-2 border-black bg-cnmb-white p-2">
                <p className="text-xs text-cnmb-gray font-body leading-snug"><span className="text-cnmb-lime-dark font-bold">✓</span> 現在無料 <span className="mx-1">|</span> <span className="text-cnmb-lime-dark font-bold">✓</span> LINE友だち追加で定期配信</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
