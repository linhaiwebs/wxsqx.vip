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
        className="mt-2 w-full border-4 border-black bg-black text-cnmb-lime font-display text-xl sm:text-2xl uppercase py-3 hover:bg-cnmb-lime hover:text-black active:translate-x-[2px] active:translate-y-[2px] transition-none flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ letterSpacing: '-0.02em', boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
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
