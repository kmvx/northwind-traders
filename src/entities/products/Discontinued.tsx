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
          ? 'text-primary dark:text-primary border-red-500/50 bg-red-500/20 dark:bg-red-500/20'
          : 'text-primary dark:text-primary border-green-500/50 bg-green-500/20 dark:bg-green-500/20',
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
