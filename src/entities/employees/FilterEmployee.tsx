import { useCallback, useMemo } from 'react';

import { Spinner } from '@/components/ui';
import { useQueryEmployees } from '@/net';
import { SelectStringList, type SelectStringListInfoType } from '@/ui';
import { getEmployeeNameByData } from '@/utils';

const EMPTY_OPTION_VALUE = '*';

interface FilterEmployeeProps {
  filterEmployeeId: number | null;
  setFilterEmployeeId: (value: number | null) => void;
}

const FilterEmployee: React.FC<FilterEmployeeProps> = ({
  filterEmployeeId,
  setFilterEmployeeId,
}) => {
  const { data: dataEmployees, isLoading } = useQueryEmployees();

  const itemsInfo = useMemo(() => {
    const result: SelectStringListInfoType[] = [
      { value: EMPTY_OPTION_VALUE, title: '👫 \xa0 All employees' },
    ];
    if (dataEmployees) {
      result.push(
        ...dataEmployees.map(
          (item): SelectStringListInfoType => ({
            value: String(item.employeeId),
            title: `${titleOfCourtesyMap[item.titleOfCourtesy ?? ''] ?? ''} \xa0 ${getEmployeeNameByData(item)}`,
            description: item.title,
          }),
        ),
      );
    }
    return result;
  }, [dataEmployees]);

  const setValue = useCallback(
    (value: string) =>
      setFilterEmployeeId(value === EMPTY_OPTION_VALUE ? null : +value),
    [setFilterEmployeeId],
  );

  if (isLoading) return <Spinner />;

  return (
    <SelectStringList
      itemsInfo={itemsInfo}
      setValue={setValue}
      value={
        filterEmployeeId == null ? EMPTY_OPTION_VALUE : String(filterEmployeeId)
      }
      title="Filter by employee"
    />
  );
};

const titleOfCourtesyMap: Record<string, string> = {
  'Dr.': '🎓',
  'Mr.': '👔',
  'Ms.': '👠',
  'Mrs.': '💍',
};

export default FilterEmployee;
