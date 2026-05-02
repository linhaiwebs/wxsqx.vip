import LoadingProgressBars from './LoadingProgressBars';
interface InlineLoadingSceneProps { isVisible: boolean; }

export default function InlineLoadingScene({ isVisible }: InlineLoadingSceneProps) {
  if (!isVisible) return null;
  return (
    <div className="w-full animate-fadeIn py-4">
      <div className="bg-cx-surface-lowest brutal-border p-4 relative" style={{ boxShadow: '4px 4px 0px 0px #001c3a' }}>
        <div className="absolute top-0 right-0 bg-cx-lime text-cx-navy font-body text-[11px] px-2 py-1 border-b-3 border-l-3 border-cx-navy uppercase font-bold" style={{ borderBottomWidth: '3px', borderLeftWidth: '3px' }}>LOADING</div>
        <div className="flex items-center gap-2 mb-3 mt-2">
          <svg className="w-5 h-5 text-cx-pink animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
          <h2 className="font-display text-xl text-cx-on-bg uppercase" style={{ fontWeight: 800 }}>AI分析中</h2>
        </div>
        <LoadingProgressBars isVisible={isVisible} />
      </div>
    </div>
  );
}
