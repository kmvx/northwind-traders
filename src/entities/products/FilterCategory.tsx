import { useCallback, useMemo } from 'react';

import { Spinner } from '@/components/ui';
import { useQueryCategories } from '@/net';
import { SelectStringList, type SelectStringListInfoType } from '@/ui';

import { getEmojiiByCategoryName } from '.';

const EMPTY_OPTION_VALUE = '*';

interface FilterCategoryProps {
  filterCategoryId: number | null;
  setFilterCategoryId: (value: number | null) => void;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({
  filterCategoryId,
  setFilterCategoryId: setFilterCategoryId,
}) => {
  const { data: dataCategories, isLoading } = useQueryCategories();

  const itemsInfo = useMemo(() => {
    const result: SelectStringListInfoType[] = [
      {
        value: EMPTY_OPTION_VALUE,
        title: '📦 \xa0 All categories',
      },
    ];
    if (dataCategories) {
      result.push(
        ...dataCategories.map(
          (item): SelectStringListInfoType => ({
            value: String(item.categoryId),
            title:
              getEmojiiByCategoryName(item.categoryName) +
              ' \xa0 ' +
              item.categoryName,
            description: item.description + ' (product category)',
          }),
        ),
      );
    }
    return result;
  }, [dataCategories]);

  const setValue = useCallback(
    (value: string) =>
      setFilterCategoryId(value === EMPTY_OPTION_VALUE ? null : +value),
    [setFilterCategoryId],
  );

  if (isLoading) return <Spinner />;

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
