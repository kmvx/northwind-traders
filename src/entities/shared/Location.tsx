import { MapPinIcon } from 'lucide-react';
import React from 'react';

import { Flag } from '.';

interface LocationProps {
  country: string;
  city: string;
  title: string;
}

const Location: React.FC<LocationProps> = ({ country, city, title }) => {
  return (
    <span
      className="text-muted-foreground flex flex-wrap items-center justify-end gap-2 text-sm"
      title={title}
    >
      <MapPinIcon className="size-4" />
      <span>
        {country}, {city}
      </span>
      <Flag country={country} />
    </span>
  );
};

export default Location;
