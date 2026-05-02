export default function EnhancedTitle() {
  return (
    <section className="mb-4 relative">
      <div className="absolute inset-0 noise-overlay z-0 pointer-events-none mix-blend-overlay"></div>
      <div className="relative z-10">
        <h2 className="font-display text-[48px] sm:text-[64px] text-kw-on-bg uppercase break-words leading-none mb-2 ml-2 -rotate-2 origin-left" style={{ fontWeight: 700, letterSpacing: '-0.05em' }}>
          市場<br/>
          <span className="text-kw-accent opacity-90" style={{ textShadow: '2px 2px 0px #000' }}>崩壊を予測せよ</span>
        </h2>
        <div className="border border-kw-white border-t-2 border-l-2 p-3 bg-kw-surface-high rotate-1 mt-1 relative mr-4 ml-2" style={{ boxShadow: '4px 4px 0 0 #d2f000' }}>
          <div className="absolute top-0 right-0 bg-kw-bg text-kw-on-primary-container font-display text-xs px-1 -translate-y-1/2 translate-x-1/2 border border-kw-white border-b-0 uppercase" style={{ letterSpacing: '0.1em', fontWeight: 500 }}>ERROR_LOG</div>
          <p className="font-body text-base text-kw-on-surface-variant leading-snug">AIが市場のノイズを解析し、暴落の予兆を検知します。あなたのポートフォリオは安全ですか？</p>
        </div>
        <div className="absolute -right-4 top-10 opacity-30 text-kw-surface-highest font-display text-[120px] z-[-1] leading-none whitespace-nowrap rotate-90 origin-bottom-right" style={{ fontWeight: 900 }}>
          NOISE
        </div>
      </div>
    </section>
  );
}
