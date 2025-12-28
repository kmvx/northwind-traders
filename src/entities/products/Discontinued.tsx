import { BanIcon, ThumbsUpIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui';

interface DiscontinuedProps {
  discontinued?: boolean;
}

const Discontinued: React.FC<DiscontinuedProps> = ({ discontinued = true }) => {
  const description = discontinued
    ? 'This product is no longer available for purchase'
    : 'This product is available for purchase';
  const Icon = discontinued ? BanIcon : ThumbsUpIcon;
  return (
    <Badge
      className={discontinued ? 'u-hue-red' : 'u-hue-green'}
      title={description}
      onClick={() => toast.info(description)}
    >
      <Icon />
      {discontinued ? 'Discontinued' : 'Active'}
    </Badge>
  );
};

export default Discontinued;
