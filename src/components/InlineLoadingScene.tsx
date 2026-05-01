import AnimatedCatRobot from './AnimatedCatRobot';
import LoadingProgressBars from './LoadingProgressBars';

interface InlineLoadingSceneProps {
  isVisible: boolean;
}

export default function InlineLoadingScene({ isVisible }: InlineLoadingSceneProps) {
  if (!isVisible) return null;

  return (
    <div className="w-full animate-fadeIn px-4 bg-white border-l-[1px] border-r-[1px] border-black py-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2 font-headline uppercase tracking-tighter">
          AI分析中
        </h2>
        <p className="text-sm md:text-base text-outline-custom font-headline uppercase tracking-wider">
          PROCESSING...
        </p>
      </div>

      <div className="flex items-center justify-center mb-6">
        <AnimatedCatRobot />
      </div>

      <div className="max-w-md mx-auto">
        <LoadingProgressBars isVisible={isVisible} />
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-outline-custom leading-relaxed font-body uppercase tracking-wider">
          公開市場データに基づいて分析を行っています
        </p>
      </div>
    </div>
  );
}
