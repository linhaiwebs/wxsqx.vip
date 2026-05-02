import LoadingProgressBars from './LoadingProgressBars';
interface InlineLoadingSceneProps { isVisible: boolean; }

export default function InlineLoadingScene({ isVisible }: InlineLoadingSceneProps) {
  if (!isVisible) return null;
  return (
    <div className="w-full animate-fadeIn py-4">
      <div className="neumorphic-card rounded-xl p-4 flex flex-col gap-4 items-center text-center">
        <div className="neumorphic-input rounded-full w-12 h-12 flex items-center justify-center">
          <svg className="w-6 h-6 text-xy-primary animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
        </div>
        <h3 className="font-display text-[20px] text-xy-on-bg" style={{ fontWeight: 600 }}>診断中...</h3>
        <LoadingProgressBars isVisible={isVisible} />
      </div>
    </div>
  );
}
