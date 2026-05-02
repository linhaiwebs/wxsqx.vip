interface ModernActionButtonProps { onClick: () => void; disabled?: boolean; }

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  return (
    <>
      <button onClick={onClick} disabled={disabled}
        className="w-full bg-cx-pink text-white brutal-border brutal-shadow brutal-shadow-hover brutal-shadow-active p-4 font-display text-xl uppercase tracking-tight flex items-center justify-center gap-2 transition-all mt-2 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed">
        <span className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
        <span className="relative z-10">診断スタート</span>
        <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
      </button>
      <p className="text-[10px] text-cx-on-surface-variant font-body mt-2 text-center" style={{ fontWeight: 500 }}>
        ※投資助言ではありません。投資判断は自己責任で。
      </p>
    </>
  );
}
