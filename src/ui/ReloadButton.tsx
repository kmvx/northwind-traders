import { RotateCwIcon } from 'lucide-react';
import React, { memo } from 'react';

import ButtonWithTooltip from './ButtonWithTooltip';

interface ReloadButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

const ReloadButton: React.FC<ReloadButtonProps> = ({ onClick, isLoading }) => {
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
};

export default memo(ReloadButton);
