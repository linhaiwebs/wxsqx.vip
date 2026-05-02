import { ReactNode } from 'react';
interface SimpleInputContainerProps { children: ReactNode; }
export default function SimpleInputContainer({ children }: SimpleInputContainerProps) {
  return <div className="bg-cbx-surface border-2 border-cbx-white p-4 relative max-w-sm" style={{ boxShadow: '8px 8px 0px 0px #CCFF00' }}>
    <div className="absolute -top-3 left-4 bg-cbx-surface-container px-2 font-body text-xs text-cbx-lime uppercase" style={{ letterSpacing: '0.1em', fontWeight: 700 }}>診断ターミナル</div>
    <div className="mt-4 flex flex-col gap-2">{children}</div>
  </div>;
}
