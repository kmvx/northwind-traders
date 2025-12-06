import { MapPinIcon } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

import { Flag } from '.';

interface ContactAddressProps {
  country: string;
  address: string;
  addressDetails: string;
  title?: string;
  className?: string;
}

const ContactAddress: React.FC<ContactAddressProps> = ({
  country,
  address,
  addressDetails,
  title,
  className,
}) => {
  return (
    <div
      className={cn('flex items-center gap-2 font-bold', className)}
      title={title ? title : 'Address'}
    >
      <div className="u-hue-green rounded-md p-2">
        <MapPinIcon className="size-4 min-w-4" />
      </div>
      <Flag country={country} />
      <div className="flex flex-col">
        <span>{address}</span>
        <span>{addressDetails}</span>
      </div>
    </div>
  );
};

export default ContactAddress;
