import { ReactNode } from 'react';
interface SimpleInputContainerProps { children: ReactNode; }
export default function SimpleInputContainer({ children }: SimpleInputContainerProps) {
  return (
    <section className="bg-cx-surface-lowest brutal-border brutal-shadow p-3 mt-4">
      <form className="flex flex-col gap-3">{children}</form>
    </section>
  );
}
