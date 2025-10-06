import { RotateCwIcon } from 'lucide-react';

import { Button } from '@/components/ui';

export default function ReloadButton({
  onClick,
  isLoading,
}: {
  onClick: () => void;
  isLoading?: boolean;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      title="Reload data"
      onClick={onClick}
      disabled={isLoading}
    >
      <RotateCwIcon className={`size-4 ${isLoading ? 'animate-spin' : ''}`} />
    </Button>
  );
}
