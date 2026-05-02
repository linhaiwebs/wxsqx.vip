export default function EnhancedTitle() {
  return (
    <section className="flex flex-col gap-1 mt-2 relative">
      <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-mb-cyan opacity-50"></div>
      <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-mb-magenta opacity-50"></div>
      <h1 className="font-display text-[40px] sm:text-[48px] text-mb-pink leading-none uppercase break-words relative z-10" style={{ fontWeight: 700, letterSpacing: '-0.05em', textShadow: '0 0 8px rgba(255,0,255,0.8)' }}>
        NEON_GENESIS:<br/>
        <span className="text-mb-cyan">診断開始</span>
      </h1>
      <div className="bg-mb-surface-high border-l-4 border-mb-pink p-4 mt-2 pixel-corner relative overflow-hidden">
        <p className="font-body text-sm text-mb-on-surface-variant relative z-10">
          システムへのアクセスを要求。以下の入力フィールドに認証コードを入力し、システム診断をトリガーしてください。不正アクセスは記録されます。
        </p>
      </div>
    </section>
  );
}
