import LoadingProgressBars from './LoadingProgressBars';
interface InlineLoadingSceneProps { isVisible: boolean; }

export default function InlineLoadingScene({ isVisible }: InlineLoadingSceneProps) {
  if (!isVisible) return null;
  return (
    <div className="w-full animate-fadeIn py-4">
      <div className="glass-panel rounded-xl p-5 flex flex-col gap-4 items-center text-center">
        <div className="w-10 h-10 border-3 border-xb-surface-highest border-t-xb-primary rounded-full animate-spin"></div>
        <h3 className="font-display text-[22px] text-xb-on-bg" style={{ fontWeight: 700 }}>診断中...</h3>
        <LoadingProgressBars isVisible={isVisible} />
      </div>
    </div>
  );
}
