import { MapPinIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Flag } from '.';

export default function ContactAddress({
  country,
  address,
  title,
  className,
}: {
  country: string;
  address: string;
  title?: string;
  className?: string;
}) {
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
}
