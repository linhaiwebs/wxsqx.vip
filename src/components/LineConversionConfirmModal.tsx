import { AlertTriangle, ExternalLink } from 'lucide-react';

interface LineConversionConfirmModalProps { isOpen: boolean; onConfirm: () => void; onCancel: () => void; }

export default function LineConversionConfirmModal({ isOpen, onConfirm, onCancel }: LineConversionConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 animate-fadeIn">
      <div className="bg-cnmb-lime border-4 border-black max-w-lg w-full" style={{ boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)' }}>
        <div className="bg-black p-3 border-b-4 border-black">
          <div className="flex items-center gap-2">
            <div className="bg-white border-2 border-black p-1"><AlertTriangle className="w-4 h-4 text-black" /></div>
            <h2 className="text-base font-display font-bold text-cnmb-lime uppercase tracking-tighter">外部サイトへ移動</h2>
          </div>
        </div>
        <div className="p-3 space-y-3 bg-cnmb-white">
          <div className="border-4 border-black p-3 bg-cnmb-bg">
            <p className="text-sm text-cnmb-on-bg mb-2 font-body font-bold">以下をご確認ください：</p>
            <ul className="space-y-1 text-sm text-cnmb-gray font-body">
              <li><span className="font-bold">•</span> 本サービスは<span className="font-bold text-black">情報提供のみ</span>を目的としています</li>
              <li><span className="font-bold">•</span> 提供された情報は<span className="font-bold text-black">投資助言ではありません</span></li>
              <li><span className="font-bold">•</span> 投資判断は<span className="font-bold text-black">必ずご自身の責任</span>で</li>
            </ul>
          </div>
          <div className="flex gap-2">
            <button onClick={onCancel} className="flex-1 py-2 px-2 bg-cnmb-gray-light border-4 border-black text-cnmb-on-bg font-display font-bold uppercase active:translate-x-[2px] active:translate-y-[2px] transition-none text-sm" style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}>キャンセル</button>
            <button onClick={onConfirm} className="flex-1 py-2 px-2 bg-black text-cnmb-lime border-4 border-black font-display font-bold uppercase active:translate-x-[2px] active:translate-y-[2px] transition-none flex items-center justify-center gap-1 text-sm" style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}>
              <span>理解して移動</span><ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
