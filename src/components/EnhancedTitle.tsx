export default function EnhancedTitle() {
  return (
    <div className="relative bg-qsdj-surface border-4 border-qsdj-on-bg shadow-hard-lg p-6 transform rotate-1 mx-auto max-w-md w-full">
      <div className="absolute -top-5 -right-4 bg-qsdj-magenta text-black border-4 border-qsdj-on-bg px-4 py-1 font-label text-sm font-bold transform rotate-12 shadow-hard z-20">
        HOT!
      </div>
      <div className="mb-8 mt-2">
        <h1 className="font-display text-[48px] leading-none font-black text-qsdj-on-bg break-words" style={{ letterSpacing: '-0.05em' }}>
          <span className="bg-qsdj-lime px-2">AI株価</span><br />
          <span className="bg-qsdj-magenta text-white px-2 mt-2 inline-block border-2 border-qsdj-on-bg shadow-hard-sm transform -rotate-2">診断</span><br />
          <span className="px-2 mt-2 inline-block">で未来を予測！</span>
        </h1>
      </div>
      <p className="font-body text-lg text-qsdj-on-surface-variant font-bold border-l-4 border-qsdj-magenta-dark pl-3 bg-qsdj-surface-high py-2 pr-2">
        銘柄コードを入力！AIが市場データを徹底分析🔥
      </p>
    </div>
  );
}
