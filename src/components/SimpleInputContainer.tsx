import { ReactNode } from 'react';
interface SimpleInputContainerProps { children: ReactNode; }
export default function SimpleInputContainer({ children }: SimpleInputContainerProps) {
  return (
    <div className="mt-8 ml-4 border-l-2 border-kw-accent pl-3 py-1">
      <span className="font-display text-xs text-kw-accent block uppercase mb-1" style={{ letterSpacing: '0.1em', fontWeight: 500 }}>TICKER_CODE //</span>
      {children}
    </div>
  );
}
