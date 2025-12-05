'use client';

import { useState } from 'react';

import { getRelativeTimeString } from '@/utils';

interface DateTimeProps {
  date: Date;
  className?: string;
}

const DateTime: React.FC<DateTimeProps> = ({ date, className }) => {
  const [isToggled, setIsToggled] = useState(false);

  const absoluteFormat = date.toLocaleString();
  const relativeFormat = getRelativeTimeString(date);

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
