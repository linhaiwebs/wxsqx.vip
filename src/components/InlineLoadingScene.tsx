import LoadingProgressBars from './LoadingProgressBars';
interface InlineLoadingSceneProps { isVisible: boolean; }

export default function InlineLoadingScene({ isVisible }: InlineLoadingSceneProps) {
  if (!isVisible) return null;
  return (
    <div className="w-full animate-fadeIn py-4">
      <div className="glass-panel border border-primary/10 rounded-xl p-component-padding-x flex flex-col gap-stack-gap items-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed/20 to-transparent pointer-events-none" />
        <div className="w-12 h-12 rounded-full bg-surface-container-high/50 border border-outline-variant/30 flex items-center justify-center relative z-10">
          <div className="animate-spin h-6 w-6 border-2 border-surface-container-highest border-t-primary rounded-full" />
        </div>
        <h3 className="font-headline-md text-headline-md text-on-background relative z-10">診断中...</h3>
        <div className="w-full relative z-10">
          <LoadingProgressBars isVisible={isVisible} />
        </div>
      </div>
    </div>
  );
}
