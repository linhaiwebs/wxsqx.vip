interface ModernActionButtonProps { onClick: () => void; disabled?: boolean; }

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  return (
    <>
      <div className="flex items-stretch gap-0 w-full max-w-sm">
        <button onClick={onClick} disabled={disabled}
          className="bg-kw-accent text-kw-on-accent font-display text-lg px-4 border-2 border-kw-accent border-l-0 hover:bg-kw-bg hover:text-kw-accent transition-colors uppercase h-12 flex items-center justify-center whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed active:bg-kw-accent active:text-kw-on-accent">
          解析
        </button>
      </div>
      <p className="text-xs text-kw-outline font-body mt-2 ml-4" style={{ letterSpacing: '0.05em' }}>
        ※投資助言ではありません。投資判断は自己責任で。
      </p>
    </>
  );
}
