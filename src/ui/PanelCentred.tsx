import clsx from 'clsx';
import React from 'react';

interface PanelCentredProps {
  children: React.ReactNode;
  className?: string;
}

const PanelCentred: React.FC<PanelCentredProps> = ({ children, className }) => {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <section className={clsx('bg-sidebar rounded-md border p-4', className)}>
        {children}
      </section>
    </div>
  );
};

export default PanelCentred;
