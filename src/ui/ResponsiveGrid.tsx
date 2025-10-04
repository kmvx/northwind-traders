import clsx from 'clsx';
import React from 'react';

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
  return (
    <div
      className={clsx(
        'grid auto-rows-fr gap-4 max-[400px]:grid-cols-1 max-[400px]:auto-rows-auto',
        className,
      )}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
      }}
    >
      {children}
    </div>
  );
};

export default ResponsiveGrid;
