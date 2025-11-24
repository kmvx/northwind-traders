import { FunnelIcon } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

import { Toggle } from '@/components/ui';

interface FiltersToggleButtonProps {
  showFilters: boolean;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
}

const FiltersToggleButton: React.FC<FiltersToggleButtonProps> = ({
  showFilters,
  setShowFilters,
}) => {
  return (
    <Toggle
      variant="outline"
      title="Toggle filters"
      data-state={showFilters ? 'on' : 'off'}
      onClick={() => setShowFilters((prev) => !prev)}
      className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-primary data-[state=on]:*:[svg]:stroke-primary"
    >
      <FunnelIcon className="size-4" />
    </Toggle>
  );
};

export default FiltersToggleButton;
