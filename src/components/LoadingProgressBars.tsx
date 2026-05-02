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
    { label: 'DATA_COLLECT', progress: stage1, color: '#CCFF00' },
    { label: 'AI_ANALYZE', progress: stage2, color: '#0448ff' },
    { label: 'REPORT_GEN', progress: stage3, color: '#ffb2b8' },
  ];

  return (
    <div className="w-full space-y-2">
      {stages.map((stage, i) => (
        <div key={i}>
          <div className="flex justify-between items-end mb-1">
            <span className="font-body text-xs text-cbx-on-surface-variant uppercase" style={{ letterSpacing: '0.1em', fontWeight: 700 }}>{stage.label}</span>
            <span className="font-display text-xl text-cbx-white" style={{ letterSpacing: '-0.02em', fontWeight: 800 }}>{Math.floor(stage.progress)}%</span>
          </div>
          <div className="w-full h-2 bg-cbx-surface-highest overflow-hidden">
            <div className="h-full transition-all duration-300" style={{ width: `${stage.progress}%`, backgroundColor: stage.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}
