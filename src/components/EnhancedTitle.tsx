export default function EnhancedTitle() {
  return (
    <div className="glass-panel rounded-xl p-5 flex flex-col gap-3">
      <h1 className="font-display text-[22px] text-xb-on-bg" style={{ fontWeight: 700, lineHeight: '1.3', letterSpacing: '-0.01em' }}>AI株価診断</h1>
      <p className="font-body text-sm text-xb-on-surface-variant" style={{ lineHeight: '1.5', letterSpacing: '0.01em' }}>最新のアルゴリズムが銘柄の未来を予測します。銘柄コードまたは企業名を入力してください。</p>
    </div>
  );
}
