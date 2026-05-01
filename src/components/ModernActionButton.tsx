interface ModernActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  return (
    <>
      <div className="relative animate-fadeIn mt-4">
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full glossy-button border-thick hard-shadow font-display text-xl text-black py-3 uppercase tracking-tighter font-black italic active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          診断開始！ ⚡
        </button>
      </div>
      <div className="mt-3 text-center">
        <p className="text-[10px] text-qdhs-on-surface-variant leading-relaxed font-body tracking-wider">
          ※投資助言ではありません。投資判断は自己責任で。
        </p>
      </div>
    </>
  );
}
