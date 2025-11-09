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
  const yearsArray = Array.from(years);

  return (
    <LocalSelectGroup
      state={filterYear}
      setState={setFilterYear}
      itemsInfo={
        yearsArray.length === 0
          ? []
          : [
              { component: 'All', value: null },
              ...yearsArray.map((year) => ({ value: year })),
            ]
      }
      title="Filter by order creation year"
    />
  );
};

export default FilterYear;
