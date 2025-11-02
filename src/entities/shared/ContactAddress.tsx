import { MapPinIcon } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

import { Flag } from '.';

interface ContactAddressProps {
  country: string;
  address: string;
  title?: string;
  className?: string;
}

const ContactAddress: React.FC<ContactAddressProps> = ({
  country,
  address,
  title,
  className,
}) => {
  return (
    <div
      className={cn('flex items-center gap-2 font-bold', className)}
      title={title ? title : 'Address'}
    >
      <MapPinIcon className="min-w-4 size-4 text-muted-foreground" />
      <Flag country={country} />
      <span>{address}</span>
    </div>
  );
};

export default ContactAddress;
