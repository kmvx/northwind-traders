import { useCallback, useMemo } from 'react';

import { useQueryCategories } from '@/net';
import { SelectStringList } from '@/ui';
import type { SelectStringListInfoType } from '@/ui/SelectStringList';

import { Category } from '.';

const EMPTY_OPTION_VALUE = '*';

interface FilterCategoryProps {
  filterCategoryId: number | null;
  setFilterCategoryId: (value: number | null) => void;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({
  filterCategoryId,
  setFilterCategoryId: setFilterCategoryId,
}) => {
  const { data: dataCategories } = useQueryCategories();

  const itemsInfo = useMemo(() => {
    let result: SelectStringListInfoType[] = [
      {
        value: EMPTY_OPTION_VALUE,
        component: <Category category={null} isLink={false} />,
      },
    ];
    if (dataCategories) {
      result = [
        ...result,
        ...dataCategories.map((item) => ({
          value: String(item.categoryId),
          component: <Category category={item} isLink={false} />,
        })),
      ];
    }
    return result;
  }, [dataCategories]);

  const setValue = useCallback(
    (value: string) =>
      setFilterCategoryId(value === EMPTY_OPTION_VALUE ? null : +value),
    [setFilterCategoryId],
  );

  return (
    <SelectStringList
      itemsInfo={itemsInfo}
      setValue={setValue}
      value={
        filterCategoryId == null ? EMPTY_OPTION_VALUE : String(filterCategoryId)
      }
      title="Filter by product category"
    />
  );
};

export default FilterCategory;
