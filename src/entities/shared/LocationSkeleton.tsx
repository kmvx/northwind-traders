import { MapPinIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui';

export default function LocationSkeleton() {
  return (
    <div className="flex items-center justify-end gap-2">
      <MapPinIcon className="size-4 text-accent" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-8 rounded" />
    </div>
  );
}
