import { AlertTriangle, ExternalLink } from 'lucide-react';
interface LineConversionConfirmModalProps { isOpen: boolean; onConfirm: () => void; onCancel: () => void; }

export default function LineConversionConfirmModal({ isOpen, onConfirm, onCancel }: LineConversionConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="border-2 border-kw-white bg-kw-bg max-w-lg w-full" style={{ boxShadow: '4px 4px 0 0 #d2f000' }}>
        <div className="bg-kw-surface-high border-b border-kw-outline-variant px-3 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-kw-error" />
            <span className="font-display text-xs text-kw-on-bg uppercase" style={{ letterSpacing: '0.1em', fontWeight: 500 }}>EXTERNAL_REDIRECT</span>
          </div>
        </div>
        <div className="p-3 space-y-3 bg-kw-surface-container">
          <div className="border border-kw-outline-variant p-3 bg-kw-surface-lowest">
            <p className="text-sm text-kw-on-bg mb-2 font-body font-bold">以下をご確認ください：</p>
            <ul className="space-y-1 text-sm text-kw-on-surface-variant font-body">
              <li><span className="text-kw-accent font-bold">•</span> 本サービスは<span className="text-kw-accent font-bold">情報提供のみ</span>を目的としています</li>
              <li><span className="text-kw-accent font-bold">•</span> 提供された情報は<span className="text-kw-accent font-bold">投資助言ではありません</span></li>
              <li><span className="text-kw-accent font-bold">•</span> 投資判断は<span className="text-kw-accent font-bold">必ずご自身の責任</span>で</li>
            </ul>
          </div>
          <div className="flex gap-2">
            <button onClick={onCancel} className="flex-1 py-2 px-2 bg-kw-surface-highest border border-kw-outline-variant text-kw-on-bg font-body font-bold uppercase text-sm hover:bg-kw-surface-high transition-colors">キャンセル</button>
            <button onClick={onConfirm} className="flex-1 py-2 px-2 bg-kw-accent text-kw-on-accent font-display font-bold uppercase text-sm hover:bg-kw-bg hover:text-kw-accent transition-colors flex items-center justify-center gap-1 border-2 border-kw-accent">
              <span>理解して移動</span><ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
