import clsx from 'clsx';
import React from 'react';

import { useIsMobile } from '@/hooks';

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
      className={clsx(
        'grid auto-rows-fr gap-4 max-[400px]:auto-rows-auto max-[400px]:grid-cols-1',
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
