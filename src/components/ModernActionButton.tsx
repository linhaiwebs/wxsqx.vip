interface ModernActionButtonProps { onClick: () => void; disabled?: boolean; }

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="bg-xb-primary text-white font-body font-semibold rounded-lg h-12 flex items-center justify-center gap-2 hover:bg-xb-primary-container transition-colors shadow-sm relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed w-full">
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
      <span className="relative z-10">診断を開始する</span>
      <svg className="relative z-10 w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
    </button>
  );
}
