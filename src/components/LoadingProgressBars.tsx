import { useEffect, useState } from 'react';

interface LoadingProgressBarsProps {
  isVisible: boolean;
}

export default function LoadingProgressBars({ isVisible }: LoadingProgressBarsProps) {
  const [stage1, setStage1] = useState(0);
  const [stage2, setStage2] = useState(0);
  const [stage3, setStage3] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setStage1(0);
      setStage2(0);
      setStage3(0);
      return;
    }

    const stage1Timer = setTimeout(() => {
      const interval1 = setInterval(() => {
        setStage1((prev) => {
          if (prev >= 100) { clearInterval(interval1); return 100; }
          return prev + 5;
        });
      }, 30);
      return () => clearInterval(interval1);
    }, 100);

    const stage2Timer = setTimeout(() => {
      const interval2 = setInterval(() => {
        setStage2((prev) => {
          if (prev >= 100) { clearInterval(interval2); return 100; }
          return prev + 4;
        });
      }, 35);
      return () => clearInterval(interval2);
    }, 600);

    const stage3Timer = setTimeout(() => {
      const interval3 = setInterval(() => {
        setStage3((prev) => {
          if (prev >= 100) { clearInterval(interval3); return 100; }
          return prev + 3;
        });
      }, 40);
      return () => clearInterval(interval3);
    }, 1200);

    return () => {
      clearTimeout(stage1Timer);
      clearTimeout(stage2Timer);
      clearTimeout(stage3Timer);
    };
  }, [isVisible]);

  const stages = [
    { label: 'DATA_COLLECT', progress: stage1, color: '#ff6b00' },
    { label: 'AI_ANALYZE', progress: stage2, color: '#ea580c' },
    { label: 'REPORT_GEN', progress: stage3, color: '#c2410c' },
  ];

  return (
    <div className="w-full space-y-3">
      {stages.map((stage, index) => (
        <div key={index} className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-black font-headline uppercase tracking-wider">{stage.label}</span>
            <span className="text-xs font-bold text-on-surface font-headline">{Math.floor(stage.progress)}%</span>
          </div>
          <div className="relative w-full h-3 bg-surface-variant border-[2px] border-black">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 ease-out"
              style={{
                width: `${stage.progress}%`,
                backgroundColor: stage.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
