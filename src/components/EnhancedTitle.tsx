export default function EnhancedTitle() {
  return (
    <section className="relative bg-cx-yellow brutal-border brutal-shadow p-4 flex flex-col items-center text-center overflow-hidden">
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-cx-pink rounded-full opacity-20 blur-xl"></div>
      <h1 className="font-display text-3xl sm:text-[32px] mb-2 z-10 text-cx-on-bg" style={{ fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
        あなたの<br/>
        <span className="text-white bg-cx-lime px-2 brutal-border -rotate-2 inline-block">丑萌タイプ</span><br/>
        を診断！
      </h1>
      <p className="font-body text-sm text-cx-on-surface-variant z-10 mt-2 font-bold bg-white px-2 py-1 brutal-border" style={{ boxShadow: '2px 2px 0px 0px #001c3a' }}>
        内なる「丑萌（ブサかわ）」モンスターを見つけよう。
      </p>
    </section>
  );
}
