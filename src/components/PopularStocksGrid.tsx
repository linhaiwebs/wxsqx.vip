const STOCKS = [
  { code: '7203', name: 'トヨタ自動車', trending: 'up' },
  { code: '6758', name: 'ソニーG', trending: 'up' },
  { code: '9984', name: 'ソフトバンクG', trending: 'down' },
  { code: '8035', name: '東エレク', trending: 'up' },
];

interface PopularStocksGridProps { onStockClick: (code: string) => void; }

export default function PopularStocksGrid({ onStockClick }: PopularStocksGridProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base text-xb-on-bg" style={{ fontWeight: 700, lineHeight: '1.6' }}>日経人気銘柄</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {STOCKS.map((stock) => (
          <div key={stock.code} className="glass-panel rounded-lg p-3 flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-display text-[11px] text-xb-tertiary uppercase" style={{ fontWeight: 600, letterSpacing: '0.05em' }}>{stock.code}</span>
                <h3 className="font-body text-sm text-xb-on-bg mt-1" style={{ fontWeight: 700 }}>{stock.name}</h3>
              </div>
              {stock.trending === 'up' ? (
                <svg className="w-5 h-5 text-xb-secondary" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
              ) : (
                <svg className="w-5 h-5 text-xb-error" viewBox="0 0 24 24" fill="currentColor"><path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"/></svg>
              )}
            </div>
            <div className="mt-auto pt-1">
              <button onClick={() => onStockClick(stock.code)} className="w-full border border-xb-outline-variant text-xb-primary font-body text-xs py-2 rounded hover:bg-white/50 transition-colors flex justify-center items-center gap-2" style={{ fontWeight: 600 }}>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                診断
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
