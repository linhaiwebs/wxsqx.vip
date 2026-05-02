import { ReactNode } from 'react';
interface SimpleInputContainerProps { children: ReactNode; }
export default function SimpleInputContainer({ children }: SimpleInputContainerProps) {
  return <div className="glass-panel p-3 flex flex-col gap-2 inner-glow-rim-light relative">
    <div className="flex flex-col gap-2 mt-1">{children}</div>
    <div className="w-full h-px bg-gradient-to-r from-transparent via-xnw-cyan to-transparent opacity-50 mt-2"></div>
  </div>;
}
