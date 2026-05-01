export default function AnimatedCatRobot() {
  return (
    <div className="flex flex-col justify-center items-center py-2">
      <div className="relative w-32 h-32 border-[3px] border-black bg-white hard-shadow flex items-center justify-center">
        <svg viewBox="0 0 120 120" className="w-24 h-24">
          {/* Bar chart icon */}
          <rect x="15" y="60" width="18" height="45" fill="#ff6b00" stroke="#000" strokeWidth="2" />
          <rect x="38" y="35" width="18" height="70" fill="#f97316" stroke="#000" strokeWidth="2" />
          <rect x="61" y="50" width="18" height="55" fill="#ea580c" stroke="#000" strokeWidth="2" />
          <rect x="84" y="20" width="18" height="85" fill="#c2410c" stroke="#000" strokeWidth="2" />
          {/* Trend line */}
          <polyline points="24,55 47,30 70,45 93,15" fill="none" stroke="#00e5ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="55" r="3" fill="#00e5ff" />
          <circle cx="47" cy="30" r="3" fill="#00e5ff" />
          <circle cx="70" cy="45" r="3" fill="#00e5ff" />
          <circle cx="93" cy="15" r="3" fill="#00e5ff" />
          {/* Arrow up */}
          <polygon points="93,8 100,18 86,18" fill="#00e5ff" stroke="#000" strokeWidth="1" />
        </svg>
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-3 h-3 bg-[#00e5ff]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#ff6b00]" />
      </div>
      <div className="mt-2 bg-black text-[#ff6b00] px-4 py-1 border-[3px] border-black font-headline text-sm font-bold tracking-widest uppercase hard-shadow">
        EHXV
      </div>
    </div>
  );
}
