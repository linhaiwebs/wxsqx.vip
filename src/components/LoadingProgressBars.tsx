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
    { label: 'データ取得', progress: s1, color: '#003dc7' },
    { label: 'AI分析', progress: s2, color: '#006d42' },
    { label: 'レポート生成', progress: s3, color: '#003dc7' },
  ];

  return (
    <div className="w-full space-y-2">
      {stages.map((stage, i) => (
        <div key={i}>
          <div className="flex justify-between mb-1">
            <span className="font-body text-[11px] text-xb-on-surface-variant" style={{ fontWeight: 600, letterSpacing: '0.05em' }}>{stage.label}</span>
            <span className="font-display text-[13px] text-xb-on-bg" style={{ fontWeight: 500 }}>{Math.floor(stage.progress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-xb-surface-container rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${stage.progress}%`, backgroundColor: stage.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}
