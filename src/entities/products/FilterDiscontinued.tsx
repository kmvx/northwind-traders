import { SelectGroup } from '@/ui';

const itemsInfo = [
  { component: 'All', value: null },
  { component: 'Discontinued', value: true },
  { component: 'Active', value: false },
] as const;

export default function FilterDiscontinued({
  filterDiscontinued,
  setDiscontinued,
}: {
  filterDiscontinued: boolean | null;
  setDiscontinued: (value: boolean | null) => void;
}) {
  const LocalSelectGroup = SelectGroup<boolean | null>;
  return (
    <LocalSelectGroup
      state={filterDiscontinued}
      setState={setDiscontinued}
      itemsInfo={itemsInfo}
      title="Product discontinued status"
    />
  );
}
