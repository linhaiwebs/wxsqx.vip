import { useEffect, useState } from 'react';

interface LoadingProgressBarsProps { isVisible: boolean; }

export default function LoadingProgressBars({ isVisible }: LoadingProgressBarsProps) {
  const [stage1, setStage1] = useState(0);
  const [stage2, setStage2] = useState(0);
  const [stage3, setStage3] = useState(0);

  useEffect(() => {
    if (!isVisible) { setStage1(0); setStage2(0); setStage3(0); return; }
    const t1 = setTimeout(() => { const i = setInterval(() => { setStage1(p => { if (p >= 100) { clearInterval(i); return 100; } return p + 5; }); }, 30); }, 100);
    const t2 = setTimeout(() => { const i = setInterval(() => { setStage2(p => { if (p >= 100) { clearInterval(i); return 100; } return p + 4; }); }, 35); }, 600);
    const t3 = setTimeout(() => { const i = setInterval(() => { setStage3(p => { if (p >= 100) { clearInterval(i); return 100; } return p + 3; }); }, 40); }, 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isVisible]);

  const stages = [
    { label: 'DATA_COLLECT', progress: stage1 },
    { label: 'AI_ANALYZE', progress: stage2 },
    { label: 'REPORT_GEN', progress: stage3 },
  ];

  return (
    <div className="w-full space-y-2">
      {stages.map((stage, i) => (
        <div key={i}>
          <div className="flex justify-between items-end mb-1">
            <span className="font-display text-sm font-bold text-cnmb-on-bg uppercase" style={{ letterSpacing: '0.05em' }}>{stage.label}</span>
            <span className="font-display text-[28px] font-bold text-cnmb-on-bg" style={{ letterSpacing: '-0.02em' }}>{Math.floor(stage.progress)}%</span>
          </div>
          <div className="w-full h-8 border-4 border-black bg-cnmb-white overflow-hidden relative">
            <div className="h-full bg-black transition-all duration-300 relative" style={{ width: `${stage.progress}%` }}>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(204,255,0,0.3) 4px, rgba(204,255,0,0.3) 8px)' }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
