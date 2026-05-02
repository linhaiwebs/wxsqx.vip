import LoadingProgressBars from './LoadingProgressBars';
interface InlineLoadingSceneProps { isVisible: boolean; }

export default function InlineLoadingScene({ isVisible }: InlineLoadingSceneProps) {
  if (!isVisible) return null;
  return (
    <div className="w-full animate-fadeIn py-4">
      <div className="glass-panel p-4 flex flex-col gap-3 inner-glow-rim-light">
        <div className="flex items-center gap-2 mb-2">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-dashed border-xnw-magenta opacity-50 animate-spin" style={{ animationDuration: '8s' }}></div>
            <svg className="w-6 h-6 text-xnw-magenta" style={{ filter: 'drop-shadow(0 0 8px rgba(255,36,228,0.6))' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.36-5.64l-4.24 4.24m-3.24-3.24L4.76 5.64m14.48 0l-4.24 4.24m-3.24 3.24L7.76 17.36"/></svg>
          </div>
          <div>
            <h2 className="font-display text-lg text-white uppercase" style={{ fontWeight: 700 }}>AI分析中</h2>
            <p className="font-display text-[11px] text-xnw-cyan uppercase" style={{ letterSpacing: '0.1em', fontWeight: 700 }}>SCANNING_PROTOCOLS</p>
          </div>
        </div>
        <LoadingProgressBars isVisible={isVisible} />
      </div>
    </div>
  );
}
