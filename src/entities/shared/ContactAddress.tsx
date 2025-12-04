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
      <MapPinIcon className="text-muted-foreground size-4 min-w-4" />
      <Flag country={country} />
      <div className="flex flex-col">
        <span>{address}</span>
        <span>{addressDetails}</span>
      </div>
    </div>
  );
};

export default ContactAddress;
