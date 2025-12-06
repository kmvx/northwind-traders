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
      className={cn('rounded-md', discontinued ? 'u-hue-red' : 'u-hue-green')}
      title={
        discontinued
          ? 'This product is no longer available'
          : 'This product is available for purchase'
      }
    >
      <Icon />
      {discontinued ? 'Discontinued' : 'Active'}
    </Badge>
  );
};

export default Discontinued;
