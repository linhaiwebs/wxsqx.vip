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
        className="mt-2 w-full border-4 border-black bg-black text-cnmb-lime font-display text-[28px] uppercase py-3 neo-shadow hover:bg-cnmb-lime hover:text-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-neo-sm transition-none flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ letterSpacing: '-0.02em' }}
      >
        <span>診断開始</span>
        <span>→</span>
      </button>
      <div className="mt-2 text-center">
        <p className="text-[10px] text-cnmb-outline leading-relaxed font-body tracking-wider">
          ※投資助言ではありません。投資判断は自己責任で。
        </p>
      </div>
    </>
  );
}
