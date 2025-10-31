import { MapPinIcon } from 'lucide-react';

import { Flag } from '.';

export default function ContactAddress({
  country,
  address,
}: {
  country: string;
  address: string;
}) {
  return (
    <div className="flex items-center gap-2" title="Address">
      <MapPinIcon className="min-w-4 size-4 text-muted-foreground" />
      <Flag country={country} />
      <b>{address}</b>
    </div>
  );
}
