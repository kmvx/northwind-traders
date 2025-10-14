import clsx from 'clsx';
import React from 'react';

import { getFlagEmojiByCountryName } from '@/utils';

const Flag: React.FC<{
  className?: string;
  country: string;
}> = ({ className, country }) => {
  return (
    <span className={clsx('font-emoji', className)} style={{ fontSize: '2rem' }}>
      {getFlagEmojiByCountryName(country)}
    </span>
  );
};

export default Flag;
