import { AlertTriangle, ExternalLink } from 'lucide-react';
interface LineConversionConfirmModalProps { isOpen: boolean; onConfirm: () => void; onCancel: () => void; }

export default function LineConversionConfirmModal({ isOpen, onConfirm, onCancel }: LineConversionConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-cx-surface-lowest brutal-border max-w-lg w-full" style={{ boxShadow: '4px 4px 0px 0px #001c3a' }}>
        <div className="bg-cx-surface-high border-b-3 border-cx-navy px-3 py-2 flex justify-between items-center" style={{ borderBottomWidth: '3px' }}>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-cx-error" />
            <span className="font-display text-[11px] text-cx-on-bg uppercase" style={{ fontWeight: 800, letterSpacing: '0.05em' }}>EXTERNAL_REDIRECT</span>
          </div>
        </div>
        <div className="p-3 space-y-3 bg-cx-surface-container">
          <div className="brutal-border p-3 bg-white">
            <p className="text-sm text-cx-on-bg mb-2 font-body" style={{ fontWeight: 700 }}>以下をご確認ください：</p>
            <ul className="space-y-1 text-sm text-cx-on-surface-variant font-body">
              <li><span className="text-cx-pink font-bold">•</span> 本サービスは<span className="text-cx-pink font-bold">情報提供のみ</span>を目的としています</li>
              <li><span className="text-cx-pink font-bold">•</span> 提供された情報は<span className="text-cx-pink font-bold">投資助言ではありません</span></li>
              <li><span className="text-cx-pink font-bold">•</span> 投資判断は<span className="text-cx-pink font-bold">必ずご自身の責任</span>で</li>
            </ul>
          </div>
          <div className="flex gap-2">
            <button onClick={onCancel} className="flex-1 py-2 px-2 bg-cx-surface-highest brutal-border text-cx-on-bg font-body font-bold uppercase text-sm hover:bg-cx-surface-dim transition-colors">キャンセル</button>
            <button onClick={onConfirm} className="flex-1 py-2 px-2 bg-cx-pink text-white brutal-border brutal-shadow brutal-shadow-hover brutal-shadow-active font-display font-bold uppercase text-sm flex items-center justify-center gap-1 transition-all">
              <span>理解して移動</span><ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
