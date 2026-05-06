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
      <div className="bg-surface-container-low border border-outline-variant rounded w-full max-w-[400px] flex flex-col gap-4 relative overflow-hidden neon-glow">
        <div className="flex justify-between items-start p-4 pb-0">
          <div>
            <span className="font-data-mono text-label-xs text-outline">DIAG_RESULT</span>
            <h3 className="font-headline-md text-headline-md text-on-surface mt-1">{stockName}（{stockCode}）</h3>
          </div>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div ref={contentRef} className="flex flex-col gap-4 overflow-y-auto max-h-[50vh] text-left px-4 pb-4">
          {isConnecting ? (
            <div className="text-center py-6">
              <div className="inline-block animate-spin h-10 w-10 border-2 border-surface-container-highest border-t-primary-fixed-dim rounded-full mb-3" />
              <p className="font-data-mono text-primary-fixed-dim">診断中...</p>
            </div>
          ) : (
            <>
              <div className="bg-error-container/20 border border-error/30 p-3 rounded">
                <p className="font-data-mono text-data-mono text-error font-bold">⚠️ 投資助言ではありません</p>
                <p className="font-body-base text-body-base text-on-surface-variant mt-1">本サービスは情報提供のみを目的としています。</p>
              </div>
              <div className="bg-surface-container p-3 rounded">
                <AnalysisRenderer text={analysis} />
                {isStreaming && <span className="inline-block w-2 h-4 animate-pulse ml-1 bg-primary-fixed-dim" />}
              </div>
              <button onClick={onLineConversion}
                className="w-full bg-primary-fixed-dim text-on-primary-fixed font-data-mono text-body-base font-bold py-3 rounded hover:bg-primary-container transition-all neon-glow-hover flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">download</span>
                詳細レポートをダウンロード
              </button>
              <div className="bg-surface-container/50 p-2 rounded">
                <p className="font-data-mono text-label-xs text-on-surface-variant text-center">
                  <span className="text-primary-fixed-dim">✓</span> 現在無料 <span className="mx-1">|</span> <span className="text-primary-fixed-dim">✓</span> LINE友だち追加で定期配信
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
