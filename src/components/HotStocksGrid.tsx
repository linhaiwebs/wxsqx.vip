interface HotStocksGridProps {
  stocks: Array<{ code: string; name: string; price: string; change: string; up: boolean; ref: string }>;
  onStockClick: (code: string, name: string) => void;
}

function CandlestickMini({ up }: { up: boolean }) {
  const bars = up
    ? ['bg-outline-variant h-8', 'bg-outline-variant h-10', 'bg-primary-fixed-dim/30 h-12', 'bg-primary-fixed-dim/30 h-14', 'bg-outline-variant h-9']
    : ['bg-primary-fixed-dim/30 h-10', 'bg-primary-fixed-dim/30 h-12', 'bg-error/30 h-14', 'bg-error/30 h-11', 'bg-outline-variant h-9'];
  return (
    <div className="h-16 flex items-end justify-between px-2 py-1 border-t border-b border-surface-container-highest opacity-50 group-hover:opacity-100 transition-opacity">
      {bars.map((b, i) => { const [cls, h] = b.split(' h'); return <div key={i} className={`w-1 ${cls} relative`} style={{ height: `${parseInt(h)}px` }} />; })}
    </div>
  );
}

export default function HotStocksGrid({ stocks, onStockClick }: HotStocksGridProps) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-outline-variant pb-2">
        <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-fixed-dim">monitoring</span>
          日経平均 注目銘柄
        </h2>
        <span className="font-data-mono text-label-xs text-outline bg-surface-container-high px-2 py-1 rounded">LIVE_DATA</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stocks.map((stock) => (
          <div key={stock.code} className="bg-surface-container-low border border-outline-variant rounded p-4 flex flex-col gap-4 relative hover:border-primary-fixed-dim transition-colors group">
            <div className="absolute top-2 right-2 font-data-mono text-label-xs text-outline">{stock.ref}</div>
            <div className="flex justify-between items-start">
              <div>
                <span className="font-data-mono text-primary-fixed-dim text-data-mono block mb-1">{stock.code}</span>
                <h3 className="font-body-base text-body-base font-bold">{stock.name}</h3>
              </div>
              <div className="text-right">
                <span className="block font-data-mono text-on-surface">{stock.price}</span>
                <span className={`block font-data-mono text-label-xs ${stock.up ? 'text-primary-fixed-dim' : 'text-error'}`}>
                  {stock.change} {stock.up ? '▲' : '▼'}
                </span>
              </div>
            </div>
            <CandlestickMini up={stock.up} />
            <button onClick={() => onStockClick(stock.code, stock.name)}
              className="w-full border border-primary-fixed-dim text-primary-fixed-dim font-data-mono text-data-mono py-2 rounded hover:bg-primary-fixed-dim/10 transition-colors neon-glow-hover flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[16px]">troubleshoot</span> 診断
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
