import { ReactNode } from 'react';
interface SimpleInputContainerProps { children: ReactNode; }
export default function SimpleInputContainer({ children }: SimpleInputContainerProps) {
  return (
    <section className="mt-5 flex flex-col gap-3">
      {children}
    </section>
  );
}
