import clsx from 'clsx';
import React from 'react';

interface PanelBasicProps {
  children: React.ReactNode;
  className?: string;
}

const PanelBasic: React.FC<PanelBasicProps> = ({ children, className }) => {
  return (
    <section className={clsx(className, 'border rounded p-4 bg-sidebar')}>
      {children}
    </section>
  );
};

export default PanelBasic;
