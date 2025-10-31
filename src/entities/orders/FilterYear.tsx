import { SelectGroup } from '@/ui';

export default function FilterYear({
  years,
  filterYear,
  setFilterYear,
}: {
  years: Iterable<number> | ArrayLike<number>;
  filterYear: number | null;
  setFilterYear: (filterYear: number | null) => void;
}) {
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
}
