import { RotateCwIcon } from 'lucide-react';

import ButtonWithTooltip from './ButtonWithTooltip';

export default function ReloadButton({
  onClick,
  isLoading,
}: {
  onClick: () => void;
  isLoading?: boolean;
}) {
  return (
    <ButtonWithTooltip
      type="button"
      variant="outline"
      size="icon"
      title="Reload data"
      onClick={onClick}
      disabled={isLoading}
    >
      <RotateCwIcon className={`size-4 ${isLoading ? 'animate-spin' : ''}`} />
    </ButtonWithTooltip>
  );
}
