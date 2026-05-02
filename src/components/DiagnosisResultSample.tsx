export default function DiagnosisResultSample() {
  return (
    <section className="mt-3">
      <div className="glass-panel rounded-xl p-5 flex flex-col gap-3 border-l-4 border-l-xb-secondary relative overflow-hidden">
        {/* Background watermark icon */}
        <div className="absolute -right-4 -top-4 opacity-5">
          <svg className="w-[100px] h-[100px] text-xb-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
        </div>
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="bg-xb-secondary-container text-xb-on-bg w-10 h-10 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </div>
          <div>
            <h3 className="font-display text-base text-xb-on-bg" style={{ fontWeight: 700, lineHeight: '1.6' }}>診断結果サンプル</h3>
            <p className="font-display text-[11px] text-xb-on-surface-variant" style={{ fontWeight: 600, letterSpacing: '0.05em' }}>7203 トヨタ自動車</p>
          </div>
        </div>
        {/* STRONG BUY row */}
        <div className="flex justify-between items-end border-b border-white/50 pb-3 mt-2">
          <span className="font-body text-sm text-xb-on-surface-variant">推奨アクション</span>
          <span className="font-display text-[24px] text-xb-secondary" style={{ fontWeight: 600, lineHeight: '1', letterSpacing: '-0.03em' }}>STRONG BUY</span>
        </div>
        {/* Description */}
        <p className="font-body text-sm text-xb-on-surface-variant leading-relaxed" style={{ fontSize: '13px' }}>
          AIスコアは92/100。直近の決算発表での上方修正と、為替変動に対する堅牢なリスクヘッジが評価されています。短期的な上昇余地が見込まれます。詳細なレポートを見るにはプレミアム登録が必要です。
        </p>
        {/* CTA — workspace_premium icon */}
        <button className="w-full bg-xb-surface-tint text-white font-body font-semibold rounded-lg h-[44px] mt-2 hover:bg-xb-primary transition-colors flex justify-center items-center gap-2">
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          プレミアムに参加して詳細を見る
        </button>
      </div>
    </section>
  );
}
