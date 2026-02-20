import React from 'react';

import { useIsMobile } from '@/hooks';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  minWidth: string;
  children: React.ReactNode;
  className?: string;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  minWidth,
  children,
  className,
}) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        'grid auto-rows-fr gap-4 max-sm:auto-rows-auto max-sm:grid-cols-1',
        className,
      )}
      style={{
        gridTemplateColumns: isMobile
          ? '1fr'
          : `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
      }}
    >
      {children}
    </div>
  );
};

export default ResponsiveGrid;
