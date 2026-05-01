interface ModernActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  return (
    <>
      <div className="relative animate-fadeIn mt-6">
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full bg-[#ff6b00] border-[3px] border-black py-4 px-6 font-headline text-lg text-black uppercase brutal-active hard-shadow-lg flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-400 transition-none"
        >
          <span>AI診断を開始する</span>
          <span className="text-2xl">→</span>
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-outline-custom leading-relaxed font-bold uppercase tracking-tight">
          ※本診断は投資助言ではありません。投資判断は自己責任でお願いいたします。
        </p>
      </div>
    </>
  );
}
