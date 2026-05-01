import AnimatedCatRobot from './AnimatedCatRobot';
import LoadingProgressBars from './LoadingProgressBars';

interface InlineLoadingSceneProps {
  isVisible: boolean;
}

export default function InlineLoadingScene({ isVisible }: InlineLoadingSceneProps) {
  if (!isVisible) return null;

  return (
    <div className="w-full animate-fadeIn px-4 py-6">
      <div className="max-w-md mx-auto bg-qdhs-surface border-thick hard-shadow p-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-display font-black text-qdhs-red italic tracking-tighter uppercase drop-shadow-[2px_2px_0px_#000]">AI分析中</h2>
          <p className="text-xs font-body text-qdhs-on-surface-variant uppercase tracking-wider mt-1">PROCESSING...</p>
        </div>
        <div className="flex items-center justify-center mb-4">
          <AnimatedCatRobot />
        </div>
        <LoadingProgressBars isVisible={isVisible} />
      </div>
    </div>
  );
}
