interface TrendingStocksProps {
  stocks: Array<{ code: string; name: string; industry: string }>;
  onStockClick: (code: string, name: string) => void;
}

export default function TrendingStocks({ stocks, onStockClick }: TrendingStocksProps) {
  return (
    <section className="flex flex-col gap-stack-gap">
      <h3 className="font-headline-md text-headline-md text-on-background flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">trending_up</span>
        日経平均 注目銘柄
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {stocks.map((stock) => (
          <div key={stock.code} className="glass-panel border border-primary/10 rounded-lg p-component-padding-x flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-body-lg text-body-lg font-bold text-on-background">{stock.name}</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">{stock.industry}</span>
            </div>
            <button onClick={() => onStockClick(stock.code, stock.name)}
              className="bg-surface-container border border-primary/20 text-primary px-4 py-1 rounded-full font-label-caps text-label-caps active:scale-95 transition-transform">
              即診断
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
