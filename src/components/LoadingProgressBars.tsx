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
    { label: 'DATA_COLLECT', progress: stage1, color: '#00a669' },
    { label: 'AI_ANALYZE', progress: stage2, color: '#ff5540' },
    { label: 'REPORT_GEN', progress: stage3, color: '#ffdb3c' },
  ];

  return (
    <div className="w-full space-y-2">
      {stages.map((stage, i) => (
        <div key={i}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] font-display font-bold text-qdhs-on-surface uppercase tracking-wider">{stage.label}</span>
            <span className="text-[10px] font-body text-qdhs-on-surface-variant">{Math.floor(stage.progress)}%</span>
          </div>
          <div className="w-full h-3 bg-qdhs-surface-highest border-2 border-qdhs-surface-lowest">
            <div className="h-full transition-all duration-300" style={{ width: `${stage.progress}%`, backgroundColor: stage.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}
