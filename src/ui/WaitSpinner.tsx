import React from 'react';

const WaitSpinner: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="m-5 size-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
    </div>
  );
};

export default WaitSpinner;
