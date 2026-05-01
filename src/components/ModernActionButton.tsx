interface ModernActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className="w-full bg-qsdj-lime text-qsdj-lime-dark border-4 border-qsdj-on-bg shadow-hard p-4 font-display text-[28px] font-extrabold transform -rotate-1 hover:bg-[#d4ff00] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ letterSpacing: '-0.02em' }}
      >
        <span>AI診断スタート</span>
        <span className="text-2xl">→</span>
      </button>
      <div className="mt-3 text-center">
        <p className="text-[10px] text-qsdj-outline leading-relaxed font-body tracking-wider">
          ※投資助言ではありません。投資判断は自己責任で。
        </p>
      </div>
    </>
  );
}
