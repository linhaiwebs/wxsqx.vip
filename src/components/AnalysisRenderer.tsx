import { ReactNode } from 'react';

interface AnalysisRendererProps { text: string; }
interface AnalysisLine { type: 'bold' | 'normal'; content: ReactNode[]; }

const parseNumber = (text: string): ReactNode[] => {
  const parts: ReactNode[] = [];
  const numberRegex = /(\d+\.?\d*%?|\d+円|[+-]\d+\.?\d*)/g;
  let lastIndex = 0; let match;
  while ((match = numberRegex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.substring(lastIndex, match.index));
    parts.push(<span key={match.index} className="text-primary-fixed-dim font-bold text-lg font-data-mono drop-shadow-[0_0_5px_rgba(0,230,57,0.5)]">{match[0]}</span>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.substring(lastIndex));
  return parts.length > 0 ? parts : [text];
};

const parseLine = (line: string): AnalysisLine => {
  const isBold = line.includes('###') || line.includes('**') || /^[\d]+\./.test(line);
  return { type: isBold ? 'bold' : 'normal', content: parseNumber(line.replace(/###|\*\*/g, '')) };
};

export default function AnalysisRenderer({ text }: AnalysisRendererProps) {
  return (
    <div className="leading-relaxed space-y-2 font-body-base text-body-base">
      {text.split('\n').map(parseLine).map((line, i) =>
        line.type === 'bold'
          ? <div key={i} className="font-bold text-on-surface mt-4 mb-2 font-headline-md">{line.content}</div>
          : <div key={i} className="text-on-surface-variant font-body-base">{line.content}</div>
      )}
    </div>
  );
}
