import LoadingProgressBars from './LoadingProgressBars';
interface InlineLoadingSceneProps { isVisible: boolean; }

export default function InlineLoadingScene({ isVisible }: InlineLoadingSceneProps) {
  if (!isVisible) return null;
  return (
    <div className="w-full animate-fadeIn py-4">
      <div className="relative p-4 bg-mb-surface-highest border border-mb-outline-variant pixel-corner overflow-hidden">
        <div className="absolute inset-0 bg-mb-surface/80 backdrop-blur-md z-0"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-4 py-10">
          <div className="absolute top-2 left-2 text-mb-error font-mono text-[10px] animate-pulse">SYS_WARN_OVERRIDE</div>
          <h2 className="font-display text-[48px] text-mb-error uppercase tracking-tighter" style={{ fontWeight: 700, textShadow: '0 0 10px rgba(255,180,171,0.5)' }}>
            ANALYZING...
          </h2>
          <LoadingProgressBars isVisible={isVisible} />
        </div>
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-mb-error z-20"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-mb-error z-20"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-mb-error z-20"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-mb-error z-20"></div>
      </div>
    </div>
  );
}
