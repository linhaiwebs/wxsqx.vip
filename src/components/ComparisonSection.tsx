export default function ComparisonSection() {
  return (
    <section className="flex flex-col gap-stack-gap mb-section-padding">
      <h3 className="font-headline-md text-headline-md text-on-background text-center">NMSLMを選ぶ理由</h3>
      <div className="flex gap-2 mt-2">
        {/* Before */}
        <div className="flex-1 bg-surface-container-low border border-outline-variant/30 rounded-lg p-component-padding-x flex flex-col items-center text-center gap-2">
          <span className="material-symbols-outlined text-error opacity-70">mood_bad</span>
          <span className="font-body-sm text-body-sm font-bold text-on-surface-variant">Before</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">不安な投資</span>
        </div>
        <div className="flex items-center justify-center text-outline-variant">
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </div>
        {/* After */}
        <div className="flex-1 glass-panel border border-primary/20 rounded-lg p-component-padding-x flex flex-col items-center text-center gap-2 bg-primary-fixed/10">
          <span className="material-symbols-outlined text-primary">spa</span>
          <span className="font-body-sm text-body-sm font-bold text-primary">After</span>
          <span className="font-label-caps text-label-caps text-primary">安心の投資</span>
        </div>
      </div>
    </section>
  );
}
