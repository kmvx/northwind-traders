import clsx from 'clsx';
import React from 'react';

const PanelStretched: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <section
      className={clsx(
        className,
        'container mx-auto border rounded p-4 bg-sidebar',
      )}
    >
      {children}
    </section>
  );
};

export default PanelStretched;
