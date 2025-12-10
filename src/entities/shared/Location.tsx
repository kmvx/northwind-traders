import { MapPinIcon } from 'lucide-react';
import React from 'react';

import type { CountryType } from '@/types';

import { Flag } from '.';

interface LocationProps {
  country: CountryType;
  city: string;
  title: string;
}

const Location: React.FC<LocationProps> = ({ country, city, title }) => {
  return (
    <span
      className="text-muted-foreground flex flex-wrap items-center justify-end gap-2 text-sm"
      title={title}
    >
      <div className="u-hue-green rounded-md p-2">
        <MapPinIcon className="size-4" />
      </div>
      <span>
        {country}, {city}
      </span>
      <Flag country={country} />
    </span>
  );
};

export default Location;
