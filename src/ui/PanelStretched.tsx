import clsx from 'clsx';
import React from 'react';

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
      className={clsx(
        className,
        'bg-sidebar container mx-auto rounded-md border p-4',
      )}
    >
      {children}
    </section>
  );
};

export default PanelStretched;
