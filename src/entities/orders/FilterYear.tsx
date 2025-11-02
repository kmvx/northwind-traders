import React from 'react';

import { SelectGroup } from '@/ui';

interface FilterYearProps {
  years: Iterable<number> | ArrayLike<number>;
  filterYear: number | null;
  setFilterYear: (filterYear: number | null) => void;
}

const FilterYear: React.FC<FilterYearProps> = ({
  years,
  filterYear,
  setFilterYear,
}) => {
  const LocalSelectGroup = SelectGroup<number | null>;
  return (
    <LocalSelectGroup
      state={filterYear}
      setState={setFilterYear}
      itemsInfo={[
        { component: 'All', value: null },
        ...Array.from(years).map((year) => ({ value: year })),
      ]}
      title="Filter by order creation year"
    />
  );
};

export default FilterYear;
