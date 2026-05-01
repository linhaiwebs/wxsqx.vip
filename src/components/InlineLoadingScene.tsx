import LoadingProgressBars from './LoadingProgressBars';

interface InlineLoadingSceneProps { isVisible: boolean; }

export default function InlineLoadingScene({ isVisible }: InlineLoadingSceneProps) {
  if (!isVisible) return null;
  return (
    <div className="w-full animate-fadeIn py-4">
      <div className="bg-cnmb-bg border-4 border-black p-4 flex flex-col gap-3" style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}>
        <h2 className="font-display text-[28px] sm:text-[32px] font-bold text-cnmb-on-bg uppercase" style={{ letterSpacing: '-0.02em' }}>AI分析中</h2>
        <p className="font-display text-sm text-cnmb-gray uppercase tracking-wider">PROCESSING...</p>
        <LoadingProgressBars isVisible={isVisible} />
      </div>
    </div>
  );
}
