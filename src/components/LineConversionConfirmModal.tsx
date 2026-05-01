import { AlertTriangle, ExternalLink } from 'lucide-react';

interface LineConversionConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LineConversionConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
}: LineConversionConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 animate-fadeIn">
      <div className="bg-white border-[3px] border-black hard-shadow-lg max-w-lg w-full">
        <div className="bg-black p-5 border-b-[3px] border-black">
          <div className="flex items-center gap-3">
            <div className="bg-[#ff6b00] p-3 border-[2px] border-black">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[#ff6b00] uppercase tracking-wider font-headline">外部サイトへ移動します</h2>
          </div>
        </div>

        <div className="p-6 space-y-5 bg-white">
          <div className="bg-[#ff6b00]/10 border-[3px] border-black p-4">
            <p className="text-sm text-black leading-relaxed mb-3 font-bold font-headline uppercase">
              LINEへ移動しますが、以下の点を再度ご確認ください：
            </p>
            <ul className="space-y-2 text-sm text-on-surface font-body">
              <li className="flex items-start gap-2">
                <span className="text-[#ff6b00] mt-1 font-bold">•</span>
                <span>本サービスは<strong className="text-[#ea580c]">情報提供のみ</strong>を目的としています</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ff6b00] mt-1 font-bold">•</span>
                <span>提供された情報は<strong className="text-[#ea580c]">投資助言ではありません</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ff6b00] mt-1 font-bold">•</span>
                <span>投資判断は<strong className="text-[#ea580c]">必ずご自身の責任</strong>で行ってください</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ff6b00] mt-1 font-bold">•</span>
                <span>外部サイトの内容について当社は責任を負いません</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 border-[3px] border-black p-4">
            <p className="text-xs text-red-800 leading-relaxed font-bold font-headline">
              重要：株式投資には元本割れのリスクがあります。AI分析結果の正確性は保証されません。
              投資は必ずご自身の判断と責任で行ってください。
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-4 bg-white border-[3px] border-black text-black font-bold brutal-active hard-shadow font-headline uppercase transition-none"
            >
              キャンセル
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 px-4 bg-[#ff6b00] border-[3px] border-black text-black font-bold brutal-active hard-shadow-lg flex items-center justify-center gap-2 font-headline uppercase transition-none"
            >
              <span>理解して移動</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
