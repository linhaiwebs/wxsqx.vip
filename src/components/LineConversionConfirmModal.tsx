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
      <div className="bg-qdhs-yellow border-thick hard-shadow max-w-lg w-full">
        <div className="bg-qdhs-red p-4 border-b-[3px] border-black">
          <div className="flex items-center gap-3">
            <div className="bg-white border-2 border-black p-2"><AlertTriangle className="w-5 h-5 text-qdhs-red" /></div>
            <h2 className="text-lg font-display font-black text-white italic tracking-tighter uppercase">外部サイトへ移動</h2>
          </div>
        </div>
        <div className="p-4 space-y-4 bg-white">
          <div className="bg-qdhs-bg border-thick p-3">
            <p className="text-sm text-qdhs-on-surface mb-2 font-body font-bold">以下をご確認ください：</p>
            <ul className="space-y-1 text-sm text-qdhs-on-surface-variant font-body">
              <li><span className="text-qdhs-yellow-dim font-bold">•</span> 本サービスは<span className="text-qdhs-red font-bold">情報提供のみ</span>を目的としています</li>
              <li><span className="text-qdhs-yellow-dim font-bold">•</span> 提供された情報は<span className="text-qdhs-red font-bold">投資助言ではありません</span></li>
              <li><span className="text-qdhs-yellow-dim font-bold">•</span> 投資判断は<span className="text-qdhs-red font-bold">必ずご自身の責任</span>で</li>
            </ul>
          </div>
          <div className="flex gap-2">
            <button onClick={onCancel} className="flex-1 py-2 px-3 bg-qdhs-surface-high border-thick text-qdhs-on-surface font-display font-bold uppercase active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">キャンセル</button>
            <button onClick={onConfirm} className="flex-1 py-2 px-3 glossy-button border-thick hard-shadow text-black font-display font-black italic uppercase active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-1">
              <span>理解して移動</span><ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
