export default function EnhancedTitle() {
  return (
    <section className="glass-panel p-3 flex flex-col gap-2 inner-glow-rim-light relative mt-2">
      <div className="absolute top-0 right-0 p-1 flex gap-1">
        <div className="w-1 h-1 bg-xnw-cyan"></div>
        <div className="w-1 h-1 bg-xnw-magenta"></div>
      </div>
      <div className="flex flex-col items-center text-center gap-1 py-4">
        <svg className="w-12 h-12 text-xnw-cyan mb-2" style={{ filter: 'drop-shadow(0 0 12px rgba(0,224,255,0.6))' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>
        <h1 className="font-display text-[28px] text-white font-bold tracking-tight leading-tight">
          サイバースキャン<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-xnw-cyan to-xnw-magenta font-display text-xl italic uppercase">Initiate Diagnostic</span>
        </h1>
        <p className="font-body text-xs text-xnw-on-surface-variant mt-2">
          あなたのデジタル・ペルソナを解析します。<br/>
          IDを入力し、診断を開始してください。
        </p>
      </div>
    </section>
  );
}
