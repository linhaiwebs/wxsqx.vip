import { AlertTriangle, ExternalLink } from 'lucide-react';
interface LineConversionConfirmModalProps { isOpen: boolean; onConfirm: () => void; onCancel: () => void; }

export default function LineConversionConfirmModal({ isOpen, onConfirm, onCancel }: LineConversionConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-mb-surface-highest border border-mb-outline-variant max-w-lg w-full pixel-corner relative">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-mb-error z-20"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-mb-error z-20"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-mb-error z-20"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-mb-error z-20"></div>
        <div className="bg-mb-surface-container border-b border-mb-outline-variant px-3 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-mb-error" />
            <span className="font-display text-[10px] text-mb-error uppercase font-mono animate-pulse">SYS_WARN_OVERRIDE</span>
          </div>
        </div>
        <div className="p-3 space-y-3 bg-mb-surface-container">
          <div className="border border-mb-outline-variant p-3 bg-mb-bg">
            <p className="text-sm text-mb-on-bg mb-2 font-body" style={{ fontWeight: 700 }}>以下をご確認ください：</p>
            <ul className="space-y-1 text-sm text-mb-on-surface-variant font-body">
              <li><span className="text-mb-cyan font-bold">•</span> 本サービスは<span className="text-mb-cyan font-bold">情報提供のみ</span>を目的としています</li>
              <li><span className="text-mb-cyan font-bold">•</span> 提供された情報は<span className="text-mb-cyan font-bold">投資助言ではありません</span></li>
              <li><span className="text-mb-cyan font-bold">•</span> 投資判断は<span className="text-mb-cyan font-bold">必ずご自身の責任</span>で</li>
            </ul>
          </div>
          <div className="flex gap-2">
            <button onClick={onCancel} className="flex-1 py-2 px-2 bg-mb-surface-highest border border-mb-outline-variant text-mb-on-bg font-mono font-bold uppercase text-sm hover:bg-mb-surface-high transition-colors">キャンセル</button>
            <button onClick={onConfirm} className="flex-1 py-2 px-2 bg-mb-magenta text-white border-2 border-mb-pink font-display font-bold uppercase text-sm flex items-center justify-center gap-1 pixel-corner hover:bg-mb-pink transition-colors">
              <span>理解して移動</span><ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
