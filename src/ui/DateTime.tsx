'use client';

import { useState } from 'react';

import { getRelativeTimeString } from '@/utils';

interface DateTimeProps {
  date: Date | null;
  className?: string;
}

const DateTime: React.FC<DateTimeProps> = ({ date, className }) => {
  const [isToggled, setIsToggled] = useState(false);

  const absoluteFormat = date ? date.toLocaleString() : 'Not Available';
  const relativeFormat = date ? getRelativeTimeString(date) : 'N/A';

  return (
    <span
      onClick={() => setIsToggled((value) => !value)}
      title={isToggled ? relativeFormat : absoluteFormat}
      className={className}
    >
      {isToggled ? absoluteFormat : relativeFormat}
    </span>
  );
};

export default DateTime;
