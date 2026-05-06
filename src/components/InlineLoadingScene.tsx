import LoadingProgressBars from './LoadingProgressBars';
interface InlineLoadingSceneProps { isVisible: boolean; }

export default function InlineLoadingScene({ isVisible }: InlineLoadingSceneProps) {
  if (!isVisible) return null;
  return (
    <div className="w-full animate-fadeIn py-4">
      <div className="bg-surface-container-low border border-outline-variant rounded p-4 flex flex-col gap-4 items-center text-center neon-glow">
        <div className="animate-spin h-12 w-12 border-2 border-surface-container-highest border-t-primary-fixed-dim rounded-full" />
        <h3 className="font-headline-md text-headline-md text-primary-fixed-dim">診断中...</h3>
        <div className="w-full">
          <LoadingProgressBars isVisible={isVisible} />
        </div>
      </div>
    </div>
  );
}
