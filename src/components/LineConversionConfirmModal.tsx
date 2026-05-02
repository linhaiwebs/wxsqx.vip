import { AlertTriangle, ExternalLink } from 'lucide-react';
interface LineConversionConfirmModalProps { isOpen: boolean; onConfirm: () => void; onCancel: () => void; }

export default function LineConversionConfirmModal({ isOpen, onConfirm, onCancel }: LineConversionConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/30 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel rounded-xl max-w-lg w-full p-5">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-xb-error" />
          <span className="font-body text-[11px] text-xb-error uppercase" style={{ fontWeight: 600 }}>外部サイトへ移動します</span>
        </div>
        <div className="glass-input rounded-lg p-3 mb-3">
          <p className="font-body text-sm text-xb-on-bg mb-2" style={{ fontWeight: 600 }}>以下をご確認ください：</p>
          <ul className="space-y-1 text-sm text-xb-on-surface-variant font-body">
            <li><span className="text-xb-secondary font-semibold">•</span> 本サービスは<span className="text-xb-primary font-semibold">情報提供のみ</span>を目的としています</li>
            <li><span className="text-xb-secondary font-semibold">•</span> 提供された情報は<span className="text-xb-primary font-semibold">投資助言ではありません</span></li>
            <li><span className="text-xb-secondary font-semibold">•</span> 投資判断は<span className="text-xb-primary font-semibold">必ずご自身の責任</span>で</li>
          </ul>
        </div>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 py-2 px-2 bg-white/40 border border-white/60 text-xb-on-bg font-body font-semibold text-sm rounded-lg hover:bg-white/60 transition-colors">キャンセル</button>
          <button onClick={onConfirm} className="flex-1 py-2 px-2 bg-xb-primary text-white font-body font-semibold text-sm rounded-lg flex items-center justify-center gap-1 hover:bg-xb-primary-container transition-colors">
            <span>理解して移動</span><ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
