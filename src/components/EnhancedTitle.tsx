export default function EnhancedTitle() {
  return (
    <section className="relative flex flex-col justify-center border-2 border-cbx-white p-4 bg-cbx-surface-lowest overflow-hidden min-h-[320px] mb-4">
      <div className="noise-bg"></div>
      <div className="absolute -right-8 -top-8 font-display text-[100px] sm:text-[120px] text-cbx-surface-highest select-none opacity-50 whitespace-nowrap rotate-90 z-0 leading-none" style={{ fontWeight: 900 }}>
        株式解析
      </div>
      <div className="relative z-10">
        <h1 className="font-display text-[36px] sm:text-[48px] text-cbx-white leading-none" style={{ letterSpacing: '-0.05em', fontWeight: 900 }}>
          AI株価<br/>
          <span className="text-cbx-lime bg-cbx-blue px-2">強制分析</span>
        </h1>
        <div className="font-body text-sm text-cbx-outline max-w-xs border-l-2 border-cbx-lime pl-2 mb-4 mt-3" style={{ lineHeight: '1.3' }}>
          [システム通信] 銘柄コードを入力。AI分析プロトコル始動。シグナルを抽出中...
        </div>
      </div>
    </section>
  );
}
