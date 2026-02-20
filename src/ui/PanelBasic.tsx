import React from 'react';

import { cn } from '@/lib/utils';

interface PanelBasicProps {
  children: React.ReactNode;
  className?: string;
}

const PanelBasic: React.FC<PanelBasicProps> = ({ children, className }) => {
  return (
    <section className={cn('bg-panel rounded-md border p-4', className)}>
      {children}
    </section>
  );
};

export default PanelBasic;
