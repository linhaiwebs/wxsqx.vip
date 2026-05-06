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
    { label: 'データ取得', progress: s1, color: '#000666' },
    { label: 'AI分析', progress: s2, color: '#1a237e' },
    { label: 'レポート生成', progress: s3, color: '#4c56af' },
  ];

  return (
    <div className="w-full space-y-2">
      {stages.map((stage, i) => (
        <div key={i}>
          <div className="flex justify-between items-center mb-1">
            <span className="font-label-caps text-label-caps text-on-surface-variant">{stage.label}</span>
            <span className="font-body-sm text-body-sm text-on-background font-bold">{Math.floor(stage.progress)}%</span>
          </div>
          <div className="w-full h-2 bg-surface-container-high/50 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${stage.progress}%`, backgroundColor: stage.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}
