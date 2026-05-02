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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-3" style={{ touchAction: 'none' }}>
      <div className="neumorphic-card rounded-xl p-4 w-full max-w-[400px] flex flex-col gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-xy-primary-container opacity-10 rounded-bl-full -mr-8 -mt-8"></div>
        <div className="flex justify-between items-start z-10">
          <div>
            <span className="font-body text-[11px] text-xy-outline uppercase tracking-wider" style={{ fontWeight: 600 }}>診断結果</span>
            <h3 className="font-display text-[20px] text-xy-on-bg mt-1" style={{ fontWeight: 600 }}>{stockName}（{stockCode}）</h3>
          </div>
          <button onClick={onClose} className="text-xy-outline hover:text-xy-on-bg transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div ref={contentRef} className="flex flex-col gap-2 overflow-y-auto max-h-[50vh] text-left z-10">
          {isConnecting ? (
            <div className="text-center py-6">
              <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3 text-xy-primary" />
              <p className="font-display text-xy-primary" style={{ fontWeight: 600 }}>診断中...</p>
            </div>
          ) : (
            <>
              <div className="bg-xy-error-container border border-xy-outline-variant p-3 rounded-lg">
                <p className="font-body text-sm text-xy-error" style={{ fontWeight: 600 }}>⚠️ 投資助言ではありません</p>
                <p className="font-body text-xs text-xy-on-surface-variant mt-1">本サービスは情報提供のみを目的としています。</p>
              </div>
              <div className="bg-xy-bg p-3 rounded-lg">
                <AnalysisRenderer text={analysis} />
                {isStreaming && <span className="inline-block w-2 h-4 animate-pulse ml-1 bg-xy-primary"></span>}
              </div>
              <button onClick={onLineConversion} className="neumorphic-button w-full h-12 rounded-full flex items-center justify-center gap-2 bg-xy-primary text-white transition-all font-body text-[11px] tracking-widest" style={{ fontWeight: 600, letterSpacing: '0.05em', boxShadow: '6px 6px 12px #e2e2e9, -6px -6px 12px #ffffff' }}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
                詳細レポートをダウンロード
              </button>
              <div className="bg-xy-surface-container p-2 rounded-lg">
                <p className="font-body text-[11px] text-xy-on-surface-variant text-center"><span className="text-xy-secondary">✓</span> 現在無料 <span className="mx-1">|</span> <span className="text-xy-secondary">✓</span> LINE友だち追加で定期配信</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
