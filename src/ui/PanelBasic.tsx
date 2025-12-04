import clsx from 'clsx';
import React from 'react';

interface PanelBasicProps {
  children: React.ReactNode;
  className?: string;
}

const PanelBasic: React.FC<PanelBasicProps> = ({ children, className }) => {
  return (
    <section className={clsx(className, 'bg-sidebar rounded-md border p-4')}>
      {children}
    </section>
  );
};

export default PanelBasic;
