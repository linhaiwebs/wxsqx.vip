import { ReactNode } from 'react';

interface SimpleInputContainerProps {
  children: ReactNode;
}

export default function SimpleInputContainer({ children }: SimpleInputContainerProps) {
  return (
    <div className="max-w-md mx-auto px-2 py-4">
      <div className="bg-white border-thick p-3 flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
}
