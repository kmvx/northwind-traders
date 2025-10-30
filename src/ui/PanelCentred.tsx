import clsx from 'clsx';
import React from 'react';

const PanelCentred: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <section className={clsx('border rounded p-4 bg-sidebar', className)}>
        {children}
      </section>
    </div>
  );
};

export default PanelCentred;
