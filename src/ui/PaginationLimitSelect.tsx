import { SelectStringList, type SelectStringListInfoType } from '.';

const LIMIT_OPTIONS = [10, 20, 50, 100] as const;

const limitItemsInfo: SelectStringListInfoType[] = LIMIT_OPTIONS.map(
  (limit) => ({
    value: String(limit),
    title: `${limit} items / page`,
    description: `Show ${limit} items per page`,
  }),
);

interface PaginationLimitSelectProps {
  limit: number;
  setLimit: (limit: number) => void;
}

const PaginationLimitSelect: React.FC<PaginationLimitSelectProps> = ({
  limit,
  setLimit,
}) => {
  return (
    <SelectStringList
      itemsInfo={limitItemsInfo}
      value={String(limit)}
      setValue={(value: string) => setLimit(+value)}
      title="Items count per page"
    />
  );
};

export default PaginationLimitSelect;
