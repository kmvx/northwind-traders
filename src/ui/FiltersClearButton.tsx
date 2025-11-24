import { FunnelXIcon } from 'lucide-react';

import { Button } from '@/components/ui';

const FiltersClearButton: React.FC<React.ComponentProps<'button'>> = ({
  ...props
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      title="Clear filters"
      {...props}
    >
      <FunnelXIcon className="size-4" />
    </Button>
  );
};

export default FiltersClearButton;
