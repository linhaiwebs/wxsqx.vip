import { AlertTriangle, ExternalLink } from 'lucide-react';
interface LineConversionConfirmModalProps { isOpen: boolean; onConfirm: () => void; onCancel: () => void; }

export default function LineConversionConfirmModal({ isOpen, onConfirm, onCancel }: LineConversionConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/90 animate-fadeIn">
      <div className="bg-cbx-surface-lowest border-2 border-cbx-white max-w-lg w-full" style={{ boxShadow: '8px 8px 0px 0px #CCFF00' }}>
        <div className="bg-cbx-blue p-3 border-b-2 border-cbx-white">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-cbx-lime" />
            <h2 className="text-sm font-display text-cbx-lime uppercase tracking-tighter" style={{ fontWeight: 900 }}>外部サイトへ移動</h2>
          </div>
        </div>
        <div className="p-3 space-y-3 bg-cbx-surface-container">
          <div className="border-2 border-cbx-outline-variant p-3 bg-cbx-surface-lowest">
            <p className="text-sm text-cbx-on-bg mb-2 font-body font-bold">以下をご確認ください：</p>
            <ul className="space-y-1 text-sm text-cbx-on-surface-variant font-body">
              <li><span className="text-cbx-lime font-bold">•</span> 本サービスは<span className="text-cbx-lime font-bold">情報提供のみ</span>を目的としています</li>
              <li><span className="text-cbx-lime font-bold">•</span> 提供された情報は<span className="text-cbx-lime font-bold">投資助言ではありません</span></li>
              <li><span className="text-cbx-lime font-bold">•</span> 投資判断は<span className="text-cbx-lime font-bold">必ずご自身の責任</span>で</li>
            </ul>
          </div>
          <div className="flex gap-2">
            <button onClick={onCancel} className="flex-1 py-2 px-2 bg-cbx-surface-highest border-2 border-cbx-outline-variant text-cbx-on-bg font-body font-bold uppercase text-sm hover:bg-cbx-surface-high transition-colors">キャンセル</button>
            <button onClick={onConfirm} className="flex-1 py-2 px-2 bg-cbx-lime text-black border-2 border-black font-body font-bold uppercase text-sm hover:bg-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-1" style={{ boxShadow: '4px 4px 0px 0px #0448ff' }}>
              <span>理解して移動</span><ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
