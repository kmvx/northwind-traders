import React from 'react';

import { cn } from '@/lib/utils';

interface PanelStretchedProps {
  children: React.ReactNode;
  className?: string;
}

const PanelStretched: React.FC<PanelStretchedProps> = ({
  children,
  className,
}) => {
  return (
    <section
      className={cn(
        'bg-panel container mx-auto rounded-md border p-4',
        className,
      )}
    >
      {children}
    </section>
  );
};

export default PanelStretched;
