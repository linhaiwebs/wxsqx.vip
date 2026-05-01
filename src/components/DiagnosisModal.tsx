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
  isOpen,
  onClose,
  analysis,
  stockCode,
  stockName,
  onLineConversion,
  onReportDownload,
  isStreaming = false,
  isConnecting = false,
}: DiagnosisModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ touchAction: 'none', backgroundColor: 'rgba(0,0,0,0.9)' }}>
      <div className="relative w-full max-w-3xl max-h-[90vh]">
        <div className="relative border-[3px] border-black overflow-hidden bg-white" style={{ touchAction: 'auto' }}>
          <div className="sticky top-0 bg-black p-4 flex items-center justify-between border-b-[3px] border-black">
            <div className="flex-1 text-center">
              <h2 className="text-sm font-bold text-[#ff6b00] uppercase tracking-widest font-headline">
                {stockName}（{stockCode}）AI ANALYSIS
              </h2>
              {isConnecting && (
                <div className="flex items-center gap-2 text-white text-sm justify-center mt-2 font-headline">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>CONNECTING...</span>
                </div>
              )}
              {isStreaming && !isConnecting && (
                <div className="flex items-center gap-2 text-white text-sm justify-center mt-2 font-headline">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>GENERATING...</span>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 border-[2px] border-white text-white hover:bg-[#ff6b00] hover:text-black hover:border-[#ff6b00] transition-none ml-4"
              aria-label="閉じる"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={contentRef} className="overflow-y-auto max-h-[calc(90vh-180px)] px-6 py-6 bg-white">
            <div className="mb-6">
              <div className="mb-4 p-4 border-[3px] border-black bg-red-50">
                <p className="text-xs text-red-800 leading-relaxed font-bold font-headline">
                  <strong>⚠️ DISCLAIMER：</strong>
                  この分析は参考情報のみであり、投資助言ではありません。AI分析の正確性は保証されません。投資判断は必ずご自身の責任で行ってください。
                </p>
              </div>

              <div className="border-[3px] border-black p-6 relative bg-surface">
                <div className="prose prose-sm max-w-none">
                  {isConnecting ? (
                    <div className="text-center py-8">
                      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-black" />
                      <p className="font-bold font-headline text-black uppercase">ANALYZING...</p>
                      <p className="text-sm mt-2 text-outline-custom font-headline">PROCESSING</p>
                    </div>
                  ) : (
                    <div>
                      <AnalysisRenderer text={analysis} />
                      {isStreaming && (
                        <span className="inline-block w-2 h-5 animate-pulse ml-1 bg-black"></span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={onLineConversion}
                className="w-full font-bold py-4 px-6 border-[3px] border-black brutal-active hard-shadow-lg flex items-center justify-center gap-3 text-sm mt-6 bg-[#ff6b00] text-black uppercase font-headline transition-none"
              >
                <ExternalLink className="w-6 h-6 flex-shrink-0" />
                <span>LINEで定期AIレポートを受け取る</span>
              </button>

              <div className="mt-3 p-4 border-[3px] border-black bg-surface">
                <div className="flex items-start gap-2 mb-2">
                  <ExternalLink className="w-5 h-5 flex-shrink-0 mt-0.5 text-black" />
                  <p className="text-sm font-bold font-headline text-black uppercase">
                    外部サービスへの移動について
                  </p>
                </div>
                <ul className="text-xs text-on-surface leading-relaxed space-y-1.5 ml-1 font-body">
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-0.5 text-black">•</span>
                    <span>このボタンをクリックすると、<strong>LINE公式アプリまたはLINE公式サイト（第三者サービス）に移動</strong>します。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-0.5 text-black">•</span>
                    <span>LINEは当サービスとは<strong>独立した別のサービス</strong>です。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-0.5 text-[#00e5ff]">✓</span>
                    <span><strong className="text-[#00e5ff]">現在無料</strong>：LINEへの移動後も現在追加料金はかかりません。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold mt-0.5 text-[#00e5ff]">✓</span>
                    <span>LINE友だち追加で定期的に最新のAI分析レポートが受け取れます。</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
