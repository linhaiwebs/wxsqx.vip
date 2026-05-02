interface ModernActionButtonProps { onClick: () => void; disabled?: boolean; }

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  return (
    <>
      <button onClick={onClick} disabled={disabled}
        className="neumorphic-button w-full h-12 rounded-full flex items-center justify-center gap-2 text-xy-primary font-body text-[11px] tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ fontWeight: 600, letterSpacing: '0.05em' }}>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
        無料診断を開始する
      </button>
      <p className="font-body text-[11px] text-xy-outline mt-1">※投資助言ではありません。投資判断は自己責任で。</p>
    </>
  );
}
