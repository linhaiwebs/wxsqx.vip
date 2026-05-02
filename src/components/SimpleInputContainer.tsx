import { ReactNode } from 'react';
interface SimpleInputContainerProps { children: ReactNode; }
export default function SimpleInputContainer({ children }: SimpleInputContainerProps) {
  return (
    <section className="neumorphic-card rounded-xl p-4 flex flex-col gap-4 items-center text-center">
      {children}
    </section>
  );
}
