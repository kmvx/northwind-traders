import React from 'react';

import { cn } from '@/lib/utils';
import type { CountryType } from '@/types';
import { getFlagEmojiByCountryName } from '@/utils';

const Flag: React.FC<{
  country: CountryType | null;
  className?: string;
}> = ({ className, country }) => {
  return (
    <span
      className={cn('u-font-flags -my-4', className)}
      style={{ fontSize: '2rem' }}
    >
      {getFlagEmojiByCountryName(country)}
    </span>
  );
};

export default Flag;
