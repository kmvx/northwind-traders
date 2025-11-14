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
        'container mx-auto border rounded-md p-4 bg-sidebar',
      )}
    >
      {children}
    </section>
  );
};

export default PanelStretched;
