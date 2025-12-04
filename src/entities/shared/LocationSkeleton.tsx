import { MapPinIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui';

export default function LocationSkeleton() {
  return (
    <div className="flex items-center justify-end gap-2">
      <MapPinIcon className="text-accent size-4" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-8 rounded" />
    </div>
  );
}
