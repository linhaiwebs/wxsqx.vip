import LoadingProgressBars from './LoadingProgressBars';
interface InlineLoadingSceneProps { isVisible: boolean; }

export default function InlineLoadingScene({ isVisible }: InlineLoadingSceneProps) {
  if (!isVisible) return null;
  return (
    <div className="w-full animate-fadeIn py-4">
      <div className="border-2 border-kw-white bg-kw-bg p-4 relative" style={{ boxShadow: '4px 4px 0 0 #d2f000' }}>
        <div className="absolute top-0 right-0 bg-kw-white text-kw-bg font-display text-xs px-2 py-1 border-b-2 border-l-2 border-kw-white uppercase font-bold" style={{ letterSpacing: '0.1em' }}>LOADING</div>
        <div className="flex items-center gap-2 mb-3 mt-2">
          <svg className="w-5 h-5 text-kw-accent animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
          <h2 className="font-display text-lg text-kw-on-bg uppercase" style={{ fontWeight: 700 }}>AI分析中</h2>
        </div>
        <LoadingProgressBars isVisible={isVisible} />
      </div>
    </div>
  );
}
