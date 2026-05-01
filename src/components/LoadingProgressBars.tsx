import { useEffect, useState } from 'react';

interface LoadingProgressBarsProps {
  isVisible: boolean;
}

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
    { label: 'DATA_COLLECT', progress: stage1, color: '#00a2a2' },
    { label: 'AI_ANALYZE', progress: stage2, color: '#ff00ff' },
    { label: 'REPORT_GEN', progress: stage3, color: '#c1f100' },
  ];

  return (
    <div className="w-full space-y-3">
      {stages.map((stage, i) => (
        <div key={i}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-label font-bold text-qsdj-on-bg uppercase tracking-widest">{stage.label}</span>
            <span className="text-xs font-body text-qsdj-outline">{Math.floor(stage.progress)}%</span>
          </div>
          <div className="w-full h-4 bg-qsdj-surface-highest border-4 border-qsdj-on-bg">
            <div className="h-full transition-all duration-300" style={{ width: `${stage.progress}%`, backgroundColor: stage.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}
