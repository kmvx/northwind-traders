import clsx from 'clsx';
import React from 'react';

import type { CountryType } from '@/types';
import { getFlagEmojiByCountryName } from '@/utils';

const Flag: React.FC<{
  country: CountryType | null;
  className?: string;
}> = ({ className, country }) => {
  return (
    <span
      className={clsx('u-font-flags -my-4', className)}
      style={{ fontSize: '2rem' }}
    >
      {getFlagEmojiByCountryName(country)}
    </span>
  );
};

export default Flag;
