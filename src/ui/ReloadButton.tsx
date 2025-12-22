import { RotateCwIcon } from 'lucide-react';
import React, { memo } from 'react';

import ButtonWithTooltip from './ButtonWithTooltip';

interface ReloadButtonProps {
  onClick: () => void;
  isFetching?: boolean;
}

const ReloadButton: React.FC<ReloadButtonProps> = ({ onClick, isFetching }) => {
  return (
    <ButtonWithTooltip
      type="button"
      variant="outline"
      size="icon"
      title="Reload data"
      onClick={onClick}
      disabled={isFetching}
    >
      <RotateCwIcon className={`size-4 ${isFetching ? 'animate-spin' : ''}`} />
    </ButtonWithTooltip>
  );
};

export default memo(ReloadButton);
