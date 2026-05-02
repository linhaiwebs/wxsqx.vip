import { ReactNode } from 'react';
interface SimpleInputContainerProps { children: ReactNode; }
export default function SimpleInputContainer({ children }: SimpleInputContainerProps) {
  return (
    <div className="flex flex-col gap-2">
      {children}
    </div>
  );
}
