export default function AnimatedCatRobot() {
  return (
    <div className="flex flex-col justify-center items-center py-2">
      <div className="relative w-28 h-28 border-thick hard-shadow bg-qdhs-yellow flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <text x="50" y="35" textAnchor="middle" className="fill-black font-display text-[28px] font-black" style={{fontFamily:'Epilogue,sans-serif'}}>AI</text>
          <rect x="15" y="48" width="70" height="4" fill="#ff5540" />
          <text x="50" y="72" textAnchor="middle" className="fill-black font-display text-[16px] font-black" style={{fontFamily:'Epilogue,sans-serif'}}>診断</text>
          <rect x="10" y="82" width="80" height="8" rx="0" fill="#131313" />
          <rect x="12" y="84" width="60" height="4" fill="#59de9b" opacity="0.8" />
        </svg>
        <div className="absolute -top-3 -right-3 bg-qdhs-green border-2 border-black w-7 h-7 flex items-center justify-center rotate-12 shadow-[2px_2px_0px_0px_#000]">
          <span className="text-white text-xs font-bold">⚡</span>
        </div>
      </div>
      <div className="mt-2 bg-qdhs-red text-white px-4 py-1 border-thick font-display text-sm font-black italic tracking-tighter hard-shadow uppercase">
        QDHS
      </div>
    </div>
  );
}
