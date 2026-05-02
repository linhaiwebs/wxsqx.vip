import { useEffect, useState } from 'react';
interface LoadingProgressBarsProps { isVisible: boolean; }

export default function LoadingProgressBars({ isVisible }: LoadingProgressBarsProps) {
  const [s1, setS1] = useState(0); const [s2, setS2] = useState(0); const [s3, setS3] = useState(0);
  useEffect(() => {
    if (!isVisible) { setS1(0); setS2(0); setS3(0); return; }
    const t1 = setTimeout(() => { const i = setInterval(() => { setS1(p => { if (p >= 100) { clearInterval(i); return 100; } return p + 5; }); }, 30); }, 100);
    const t2 = setTimeout(() => { const i = setInterval(() => { setS2(p => { if (p >= 100) { clearInterval(i); return 100; } return p + 4; }); }, 35); }, 600);
    const t3 = setTimeout(() => { const i = setInterval(() => { setS3(p => { if (p >= 100) { clearInterval(i); return 100; } return p + 3; }); }, 40); }, 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isVisible]);

  const stages = [
    { label: 'NEURAL_NET_SYNC', progress: s1, color: '#ff00ff' },
    { label: 'CORE_INTEGRITY', progress: s2, color: '#00fbfb' },
    { label: 'DATA_PARSE', progress: s3, color: '#ff00ff' },
  ];

  return (
    <div className="w-full flex flex-col gap-1 mt-2">
      {stages.map((stage, i) => (
        <div key={i}>
          <div className="w-full bg-mb-surface-container h-2 relative border border-mb-outline-variant overflow-hidden">
            <div className="absolute top-0 left-0 h-full transition-all duration-300" style={{ width: `${stage.progress}%`, backgroundColor: stage.color }} />
          </div>
          <div className="w-full flex justify-between font-mono text-[10px] text-mb-on-surface-variant">
            <span>{stage.label}</span>
            <span className={stage.progress >= 100 && stage.color === '#00fbfb' ? 'text-mb-cyan' : ''}>{Math.floor(stage.progress)}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
