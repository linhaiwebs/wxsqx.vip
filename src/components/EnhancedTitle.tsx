export default function EnhancedTitle() {
  return (
    <section className="border-4 border-black bg-cnmb-lime p-4 neo-shadow-lg flex flex-col gap-2 relative z-10">
      <h1 className="font-display text-[48px] leading-none font-bold text-cnmb-lime-dark uppercase break-words" style={{ letterSpacing: '-0.04em' }}>
        AI株価を<br/>解析せよ
      </h1>
      <p className="font-body text-lg text-cnmb-on-surface-variant font-bold border-l-4 border-black pl-2 py-1 bg-cnmb-white mt-2" style={{ letterSpacing: '-0.01em' }}>
        銘柄コードからシグナルを抽出。市場データを即座に判定します。
      </p>
    </section>
  );
}
