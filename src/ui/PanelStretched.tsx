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
        'container mx-auto bg-gray-50 shadow rounded p-4',
      )}
    >
      {children}
    </section>
  );
};

export default PanelStretched;
