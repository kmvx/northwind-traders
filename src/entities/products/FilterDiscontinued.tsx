import React from 'react';

import { SelectGroup } from '@/ui';

const itemsInfo = [
  { component: 'All', value: null },
  { component: 'Active', value: false },
  { component: 'Discontinued', value: true },
] as const;

interface FilterDiscontinuedProps {
  filterDiscontinued: boolean | null;
  setDiscontinued: (value: boolean | null) => void;
}

const FilterDiscontinued: React.FC<FilterDiscontinuedProps> = ({
  filterDiscontinued,
  setDiscontinued,
}) => {
  const LocalSelectGroup = SelectGroup<boolean | null>;
  return (
    <LocalSelectGroup
      state={filterDiscontinued}
      setState={setDiscontinued}
      itemsInfo={itemsInfo}
      title="Product discontinued status"
    />
  );
};

export default FilterDiscontinued;
