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
        'container mx-auto shadow rounded p-4 bg-neutral-50 dark:bg-neutral-900',
      )}
    >
      {children}
    </section>
  );
};

export default PanelStretched;
