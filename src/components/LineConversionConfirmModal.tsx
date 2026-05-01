import { AlertTriangle, ExternalLink } from 'lucide-react';

interface LineConversionConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LineConversionConfirmModal({ isOpen, onConfirm, onCancel }: LineConversionConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-qsdj-surface border-4 border-qsdj-on-bg shadow-hard-lg max-w-lg w-full">
        <div className="bg-qsdj-magenta p-4 border-b-4 border-qsdj-on-bg">
          <div className="flex items-center gap-3">
            <div className="bg-white border-4 border-qsdj-on-bg p-2"><AlertTriangle className="w-5 h-5 text-qsdj-magenta-dark" /></div>
            <h2 className="text-lg font-display font-black text-white italic tracking-tighter uppercase">外部サイトへ移動</h2>
          </div>
        </div>
        <div className="p-4 space-y-4 bg-white">
          <div className="bg-qsdj-surface-container border-4 border-qsdj-on-bg p-3">
            <p className="text-sm text-qsdj-on-bg mb-2 font-body font-bold">以下をご確認ください：</p>
            <ul className="space-y-1 text-sm text-qsdj-on-surface-variant font-body">
              <li><span className="text-qsdj-magenta font-bold">•</span> 本サービスは<span className="text-qsdj-magenta-dark font-bold">情報提供のみ</span>を目的としています</li>
              <li><span className="text-qsdj-magenta font-bold">•</span> 提供された情報は<span className="text-qsdj-magenta-dark font-bold">投資助言ではありません</span></li>
              <li><span className="text-qsdj-magenta font-bold">•</span> 投資判断は<span className="text-qsdj-magenta-dark font-bold">必ずご自身の責任</span>で</li>
            </ul>
          </div>
          <div className="flex gap-2">
            <button onClick={onCancel} className="flex-1 py-2 px-3 bg-qsdj-surface-highest border-4 border-qsdj-on-bg shadow-hard text-qsdj-on-bg font-label font-bold uppercase active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">キャンセル</button>
            <button onClick={onConfirm} className="flex-1 py-2 px-3 bg-qsdj-lime text-qsdj-lime-dark border-4 border-qsdj-on-bg shadow-hard font-display font-extrabold uppercase active:translate-y-1 active:translate-x-1 active:shadow-none transition-all flex items-center justify-center gap-1">
              <span>理解して移動</span><ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
