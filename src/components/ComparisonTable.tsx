export default function ComparisonTable() {
  const rows = [
    { label: 'スピード', before: 'hourglass_empty', after: 'bolt' },
    { label: '精度', before: 'trending_flat', after: 'check_circle' },
    { label: 'カスタマイズ', before: 'close', after: 'check_circle' },
  ];

  return (
    <section className="flex flex-col gap-6 mt-8">
      <div className="flex items-center justify-between border-b border-outline-variant pb-2">
        <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-fixed-dim">fact_check</span>
          選ばれる理由
        </h2>
        <span className="font-data-mono text-label-xs text-outline bg-surface-container-high px-2 py-1 rounded">比較データ</span>
      </div>
      <div className="bg-surface-container-low border border-outline-variant rounded overflow-hidden">
        <div className="grid grid-cols-3 border-b border-outline-variant bg-surface-container-highest font-data-mono text-data-mono p-4">
          <div className="text-outline">指標</div>
          <div className="text-outline text-center">従来分析</div>
          <div className="text-primary-fixed-dim text-center font-bold">SNXWX 診断</div>
        </div>
        {rows.map((row, i) => (
          <div key={i} className={`grid grid-cols-3 p-4 items-center group hover:bg-surface-container-high transition-colors ${i < rows.length - 1 ? 'border-b border-outline-variant' : ''}`}>
            <div className="font-body-base">{row.label}</div>
            <div className="text-center text-outline-variant">
              <span className="material-symbols-outlined text-[20px]">{row.before}</span>
            </div>
            <div className="text-center text-primary-fixed-dim drop-shadow-[0_0_5px_rgba(0,230,57,0.5)]">
              <span className="material-symbols-outlined text-[24px]">{row.after}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
