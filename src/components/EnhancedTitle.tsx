export default function EnhancedTitle() {
  return (
    <div className="flex flex-col items-center gap-3 px-4">
      <div className="bg-qdhs-yellow border-thick hard-shadow p-3 relative overflow-hidden flex flex-col items-center text-center w-full">
        <div className="absolute -top-3 -right-3 bg-qdhs-green text-white px-2 py-1 border-2 border-black rotate-12 z-10 shadow-[2px_2px_0px_0px_#000] text-[10px] font-display font-bold">NEW!</div>
        <h2 className="font-display text-[36px] leading-[0.95] font-black text-black tracking-tighter drop-shadow-[2px_2px_0px_#fff]">
          AI株価<br/>診断
        </h2>
        <p className="font-body text-sm text-qdhs-yellow-dim bg-white border-2 border-black px-2 py-0.5 -rotate-1 inline-block mt-1 font-bold">
          銘柄コードでAI分析！
        </p>
      </div>
    </div>
  );
}
