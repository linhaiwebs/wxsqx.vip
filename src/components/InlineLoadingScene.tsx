import LoadingProgressBars from './LoadingProgressBars';

interface InlineLoadingSceneProps {
  isVisible: boolean;
}

export default function InlineLoadingScene({ isVisible }: InlineLoadingSceneProps) {
  if (!isVisible) return null;

  return (
    <div className="w-full animate-fadeIn px-4 py-6">
      <div className="max-w-md mx-auto bg-qsdj-surface border-4 border-qsdj-on-bg shadow-hard-lg p-6">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-display font-black text-qsdj-on-bg italic tracking-tighter uppercase" style={{ letterSpacing: '-0.05em' }}>AI分析中</h2>
          <p className="text-xs font-label text-qsdj-on-surface-variant uppercase tracking-widest mt-1">PROCESSING...</p>
        </div>
        <LoadingProgressBars isVisible={isVisible} />
      </div>
    </div>
  );
}
