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
      <div className="glass-panel w-full max-w-[400px] border border-xnw-magenta/50 flex flex-col inner-glow-rim-light relative overflow-hidden" style={{ boxShadow: '0 0 30px rgba(255,36,228,0.2)' }}>
        {/* Header */}
        <div className="bg-xnw-surface-high border-b border-xnw-outline-variant/30 px-3 py-1 flex justify-between items-center relative">
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-xnw-magenta to-transparent"></div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-xnw-magenta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
            <span className="font-display text-[11px] text-white uppercase" style={{ letterSpacing: '0.1em', fontWeight: 700 }}>DIAGNOSTIC_RESULT</span>
          </div>
          <button onClick={onClose} className="text-xnw-outline-variant hover:text-white transition-colors"><X className="w-4 h-4" /></button>
        </div>
        {/* Content */}
        <div className="p-4 flex flex-col items-center text-center gap-3 relative">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(255,36,228,0.1) 0%, transparent 70%)' }}></div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-xnw-magenta to-xnw-cyan tracking-tighter relative z-10">{stockName}（{stockCode}）</h2>
          <div ref={contentRef} className="flex flex-col gap-2 overflow-y-auto max-h-[50vh] w-full text-left relative z-10">
            {isConnecting ? (
              <div className="text-center py-6">
                <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3 text-xnw-cyan" style={{ filter: 'drop-shadow(0 0 8px rgba(0,224,255,0.8))' }} />
                <p className="font-display text-xnw-cyan uppercase tracking-wider" style={{ fontWeight: 700 }}>SCANNING...</p>
              </div>
            ) : (
              <>
                <div className="bg-xnw-surface-container border-l-2 border-xnw-magenta p-2">
                  <p className="text-xs text-xnw-magenta leading-snug font-body font-bold">⚠️ 免責事項：この分析は参考情報のみであり、投資助言ではありません。</p>
                </div>
                <div className="bg-xnw-surface-highest p-3 inner-glow-rim-light">
                  <AnalysisRenderer text={analysis} />
                  {isStreaming && <span className="inline-block w-2 h-4 animate-pulse ml-1 bg-xnw-cyan"></span>}
                </div>
                <button onClick={onLineConversion} className="w-full bg-xnw-magenta text-white font-display text-sm font-bold py-3 mt-2 flex justify-center items-center gap-2 power-up-glow-on-hover transition-all border border-white/20" style={{ boxShadow: '0 0 15px rgba(255,36,228,0.4)' }}>
                  <span>今すぐ詳細をチェック</span><ExternalLink className="w-4 h-4" />
                </button>
                <div className="border border-xnw-outline-variant/30 bg-xnw-surface-container p-2">
                  <p className="text-xs text-xnw-on-surface-variant font-body leading-snug"><span className="text-xnw-green font-bold">✓</span> 現在無料 <span className="mx-1">|</span> <span className="text-xnw-green font-bold">✓</span> LINE友だち追加で定期配信</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
