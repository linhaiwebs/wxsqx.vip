import { ReactNode } from 'react';
interface SimpleInputContainerProps { children: ReactNode; }
export default function SimpleInputContainer({ children }: SimpleInputContainerProps) {
  return (
    <section className="flex flex-col gap-4 mt-6 relative">
      {children}
    </section>
  );
}
