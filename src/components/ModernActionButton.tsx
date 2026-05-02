interface ModernActionButtonProps { onClick: () => void; disabled?: boolean; }

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  return (
    <>
      <button onClick={onClick} disabled={disabled}
        className="w-full bg-cbx-lime text-black font-body text-xs uppercase py-4 border-2 border-black hover:bg-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:bg-cbx-blue-light transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ letterSpacing: '0.1em', fontWeight: 700, boxShadow: '4px 4px 0px 0px #0448ff' }}>
        診断開始
      </button>
      <p className="text-[10px] text-cbx-outline font-body mt-2 text-center" style={{ letterSpacing: '0.05em' }}>
        ※投資助言ではありません。投資判断は自己責任で。
      </p>
    </>
  );
}
