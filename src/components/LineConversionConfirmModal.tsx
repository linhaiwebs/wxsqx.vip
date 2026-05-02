import { AlertTriangle, ExternalLink } from 'lucide-react';
interface LineConversionConfirmModalProps { isOpen: boolean; onConfirm: () => void; onCancel: () => void; }

export default function LineConversionConfirmModal({ isOpen, onConfirm, onCancel }: LineConversionConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel max-w-lg w-full inner-glow-rim-light" style={{ boxShadow: '0 0 30px rgba(0,224,255,0.2)' }}>
        <div className="bg-xnw-surface-high border-b border-xnw-outline-variant/30 px-3 py-2 flex justify-between items-center relative">
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-xnw-cyan to-transparent"></div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-xnw-magenta" />
            <span className="font-display text-[11px] text-white uppercase" style={{ letterSpacing: '0.1em', fontWeight: 700 }}>EXTERNAL_REDIRECT</span>
          </div>
        </div>
        <div className="p-3 space-y-3 bg-xnw-surface-container">
          <div className="border border-xnw-outline-variant/30 p-3 bg-xnw-surface-lowest">
            <p className="text-sm text-xnw-on-bg mb-2 font-body font-bold">以下をご確認ください：</p>
            <ul className="space-y-1 text-sm text-xnw-on-surface-variant font-body">
              <li><span className="text-xnw-cyan font-bold">•</span> 本サービスは<span className="text-xnw-cyan font-bold">情報提供のみ</span>を目的としています</li>
              <li><span className="text-xnw-cyan font-bold">•</span> 提供された情報は<span className="text-xnw-cyan font-bold">投資助言ではありません</span></li>
              <li><span className="text-xnw-cyan font-bold">•</span> 投資判断は<span className="text-xnw-cyan font-bold">必ずご自身の責任</span>で</li>
            </ul>
          </div>
          <div className="flex gap-2">
            <button onClick={onCancel} className="flex-1 py-2 px-2 bg-xnw-surface-highest border border-xnw-outline-variant/30 text-xnw-on-bg font-body font-bold uppercase text-sm hover:bg-xnw-surface-high transition-colors">キャンセル</button>
            <button onClick={onConfirm} className="flex-1 py-2 px-2 bg-xnw-cyan text-xnw-surface-lowest font-display font-bold uppercase text-sm power-up-glow-on-hover transition-all flex items-center justify-center gap-1 border border-white/20">
              <span>理解して移動</span><ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
