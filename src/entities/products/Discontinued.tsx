import { BanIcon, ThumbsUpIcon } from 'lucide-react';

import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface DiscontinuedProps {
  discontinued?: boolean;
}

const Discontinued: React.FC<DiscontinuedProps> = ({ discontinued = true }) => {
  const Icon = discontinued ? BanIcon : ThumbsUpIcon;
  return (
    <Badge
      className={cn(
        'rounded-md',
        discontinued
          ? 'border-red-500/50 bg-red-500/20 text-red-700 dark:bg-red-500/20 dark:text-red-400'
          : 'border-green-500/50 bg-green-500/20 text-green-700 dark:bg-green-500/20 dark:text-green-400',
      )}
      title={
        discontinued
          ? 'This product is no longer available'
          : 'This product is available for purchase'
      }
      variant={discontinued ? 'destructive' : 'outline'}
    >
      <Icon />
      {discontinued ? 'Discontinued' : 'Active'}
    </Badge>
  );
};

export default Discontinued;
