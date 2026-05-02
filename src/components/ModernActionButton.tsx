interface ModernActionButtonProps { onClick: () => void; disabled?: boolean; }

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  return (
    <>
      <button onClick={onClick} disabled={disabled}
        className="w-full bg-mb-surface-lowest border-2 border-mb-cyan text-mb-cyan font-display text-2xl py-4 mt-2 uppercase tracking-widest relative overflow-hidden group hover:border-mb-pink hover:text-mb-pink transition-colors pixel-corner hard-shadow-cyan disabled:opacity-50 disabled:cursor-not-allowed">
        <div className="absolute inset-0 bg-mb-cyan/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
        <span className="relative z-10 flex items-center justify-center gap-2">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          システム診断
        </span>
      </button>
      <p className="text-[10px] text-mb-outline font-body mt-2 text-center" style={{ letterSpacing: '0.05em' }}>
        ※投資助言ではありません。投資判断は自己責任で。
      </p>
    </>
  );
}
