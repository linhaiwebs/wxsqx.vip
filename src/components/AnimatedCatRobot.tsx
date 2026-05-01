export default function AnimatedCatRobot() {
  return (
    <div className="flex flex-col justify-center items-center py-2">
      <div className="relative w-36 h-36 animate-pulse-glow">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 10px 30px rgba(20, 184, 166, 0.3))' }}
        >
          <defs>
            <linearGradient id="tsdyLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#0f766e', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="tsdyRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#2dd4bf', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: '#14b8a6', stopOpacity: 0.2 }} />
            </linearGradient>
          </defs>

          {/* Outer glow ring */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="url(#tsdyRingGradient)" strokeWidth="2" opacity="0.5">
            <animate attributeName="r" values="88;92;88" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
          </circle>

          {/* Background circle */}
          <circle cx="100" cy="100" r="80" fill="#0a2e2b" stroke="url(#tsdyLogoGradient)" strokeWidth="3" />

          {/* Chart line pattern */}
          <polyline
            points="30,130 55,110 75,125 100,80 125,95 150,60 170,75"
            fill="none"
            stroke="url(#tsdyLogoGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          >
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </polyline>

          {/* Chart dots */}
          <circle cx="100" cy="80" r="4" fill="#2dd4bf" opacity="0.9">
            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="150" cy="60" r="4" fill="#5eead4" opacity="0.9">
            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="170" cy="75" r="3" fill="#99f6e4" opacity="0.8" />

          {/* TSDY text */}
          <text x="100" y="168" textAnchor="middle" fill="#2dd4bf" fontSize="28" fontWeight="700" fontFamily="system-ui, sans-serif">
            TSDY
          </text>
        </svg>
      </div>
    </div>
  );
}
