interface LineConversionConfirmModalProps { isOpen: boolean; onConfirm: () => void; onCancel: () => void; }

export default function LineConversionConfirmModal({ isOpen, onConfirm, onCancel }: LineConversionConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-low border border-outline-variant rounded max-w-lg w-full p-4 neon-glow">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-error">warning</span>
          <span className="font-data-mono text-label-xs text-error">外部サイトへ移動します</span>
        </div>
        <div className="bg-surface-container rounded p-3 mb-3">
          <p className="font-body-base text-body-base text-on-surface mb-2 font-bold">以下をご確認ください：</p>
          <ul className="space-y-1 font-body-base text-body-base text-on-surface-variant">
            <li><span className="text-primary-fixed-dim font-bold">•</span> 本サービスは<span className="text-primary-fixed-dim font-bold">情報提供のみ</span>を目的としています</li>
            <li><span className="text-primary-fixed-dim font-bold">•</span> 提供された情報は<span className="text-primary-fixed-dim font-bold">投資助言ではありません</span></li>
            <li><span className="text-primary-fixed-dim font-bold">•</span> 投資判断は<span className="text-primary-fixed-dim font-bold">必ずご自身の責任</span>で</li>
          </ul>
        </div>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 py-2 px-2 border border-outline-variant text-on-surface-variant rounded font-data-mono text-data-mono hover:bg-surface-container-high transition-colors">キャンセル</button>
          <button onClick={onConfirm} className="flex-1 py-2 px-2 bg-primary-fixed-dim text-on-primary-fixed rounded font-data-mono text-data-mono font-bold flex items-center justify-center gap-1 neon-glow-hover">
            <span>理解して移動</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </button>
        </div>
      </div>
    </div>
  );
}
