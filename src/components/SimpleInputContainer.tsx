import { ReactNode } from 'react';

interface SimpleInputContainerProps {
  children: ReactNode;
}

export default function SimpleInputContainer({ children }: SimpleInputContainerProps) {
  return (
    <div className="max-w-md mx-auto px-4 py-6 bg-white border-l-[1px] border-r-[1px] border-black">
      {children}
    </div>
  );
}
