import React from 'react';

import { cn } from '@/lib/utils';

interface PanelCentredProps {
  children: React.ReactNode;
  className?: string;
}

const PanelCentred: React.FC<PanelCentredProps> = ({ children, className }) => {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <section className={cn('bg-panel rounded-md border p-4', className)}>
        {children}
      </section>
    </div>
  );
};

export default PanelCentred;
