interface LineConversionConfirmModalProps { isOpen: boolean; onConfirm: () => void; onCancel: () => void; }

export default function LineConversionConfirmModal({ isOpen, onConfirm, onCancel }: LineConversionConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel border border-primary/10 rounded-xl max-w-lg w-full p-component-padding-x">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-error">warning</span>
          <span className="font-label-caps text-label-caps text-error">外部サイトへ移動します</span>
        </div>
        <div className="bg-surface-container-low/50 rounded-lg p-3 mb-3">
          <p className="font-body-lg text-body-lg text-on-background mb-2 font-bold">以下をご確認ください：</p>
          <ul className="space-y-1 font-body-sm text-body-sm text-on-surface-variant">
            <li><span className="text-primary font-bold">•</span> 本サービスは<span className="text-primary font-bold">情報提供のみ</span>を目的としています</li>
            <li><span className="text-primary font-bold">•</span> 提供された情報は<span className="text-primary font-bold">投資助言ではありません</span></li>
            <li><span className="text-primary font-bold">•</span> 投資判断は<span className="text-primary font-bold">必ずご自身の責任</span>で</li>
          </ul>
        </div>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 py-2 px-2 bg-surface-container border border-outline-variant/30 text-on-background rounded-full font-body-lg text-body-lg font-bold active:scale-95 transition-transform">キャンセル</button>
          <button onClick={onConfirm} className="flex-1 py-2 px-2 bg-primary text-on-primary rounded-full font-body-lg text-body-lg font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform">
            <span>理解して移動</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </button>
        </div>
      </div>
    </div>
  );
}
