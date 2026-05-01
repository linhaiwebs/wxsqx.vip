import { ReactNode } from 'react';

interface SimpleInputContainerProps {
  children: ReactNode;
}

export default function SimpleInputContainer({ children }: SimpleInputContainerProps) {
  return (
    <div className="max-w-md mx-auto px-4 py-4">
      <div className="flex flex-col gap-6">
        {children}
      </div>
    </div>
  );
}
