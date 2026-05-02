import LoadingProgressBars from './LoadingProgressBars';
interface InlineLoadingSceneProps { isVisible: boolean; }

export default function InlineLoadingScene({ isVisible }: InlineLoadingSceneProps) {
  if (!isVisible) return null;
  return (
    <div className="w-full animate-fadeIn py-4">
      <div className="bg-cbx-surface-lowest border-2 border-cbx-white p-4 flex flex-col gap-3" style={{ boxShadow: '8px 8px 0px 0px #CCFF00' }}>
        <h2 className="font-display text-[24px] sm:text-[32px] text-cbx-white uppercase" style={{ letterSpacing: '-0.05em', fontWeight: 900 }}>AI分析中</h2>
        <p className="font-body text-xs text-cbx-outline uppercase" style={{ letterSpacing: '0.1em', fontWeight: 700 }}>PROCESSING...</p>
        <LoadingProgressBars isVisible={isVisible} />
      </div>
    </div>
  );
}
