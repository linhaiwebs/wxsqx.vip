interface ModernActionButtonProps { onClick: () => void; disabled?: boolean; }

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  return (
    <>
      <button onClick={onClick} disabled={disabled}
        className="w-full bg-gradient-to-r from-xnw-cyan to-blue-600 text-xnw-surface-lowest font-display text-base font-bold py-3 mt-2 flex justify-center items-center gap-2 power-up-glow-on-hover transition-all relative overflow-hidden group border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed">
        <span className="relative z-10">診断スタート</span>
        <svg className="w-4 h-4 relative z-10" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <div className="absolute top-1 left-1 w-1 h-1 bg-white opacity-50"></div>
      </button>
      <p className="text-[10px] text-xnw-outline font-body mt-2 text-center" style={{ letterSpacing: '0.05em' }}>
        ※投資助言ではありません。投資判断は自己責任で。
      </p>
    </>
  );
}
