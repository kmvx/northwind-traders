import React from 'react';

const WaitSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="border-muted border-t-primary m-5 size-8 animate-spin rounded-full border-4" />
    </div>
  );
};

export default WaitSpinner;
