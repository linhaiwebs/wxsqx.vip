import { AlertTriangle, ExternalLink } from 'lucide-react';
interface LineConversionConfirmModalProps { isOpen: boolean; onConfirm: () => void; onCancel: () => void; }

export default function LineConversionConfirmModal({ isOpen, onConfirm, onCancel }: LineConversionConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="neumorphic-card rounded-xl max-w-lg w-full p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-xy-error" />
          <span className="font-body text-[11px] text-xy-error uppercase" style={{ fontWeight: 600 }}>外部サイトへ移動します</span>
        </div>
        <div className="neumorphic-input rounded-lg p-3 mb-3">
          <p className="font-body text-sm text-xy-on-bg mb-2" style={{ fontWeight: 600 }}>以下をご確認ください：</p>
          <ul className="space-y-1 text-sm text-xy-on-surface-variant font-body">
            <li><span className="text-xy-secondary font-semibold">•</span> 本サービスは<span className="text-xy-primary font-semibold">情報提供のみ</span>を目的としています</li>
            <li><span className="text-xy-secondary font-semibold">•</span> 提供された情報は<span className="text-xy-primary font-semibold">投資助言ではありません</span></li>
            <li><span className="text-xy-secondary font-semibold">•</span> 投資判断は<span className="text-xy-primary font-semibold">必ずご自身の責任</span>で</li>
          </ul>
        </div>
        <div className="flex gap-2">
          <button onClick={onCancel} className="neumorphic-button flex-1 py-2 px-2 rounded-full text-xy-on-bg font-body font-semibold text-sm">キャンセル</button>
          <button onClick={onConfirm} className="flex-1 py-2 px-2 bg-xy-primary text-white rounded-full font-body font-semibold text-sm flex items-center justify-center gap-1 transition-all">
            <span>理解して移動</span><ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
