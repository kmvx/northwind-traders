import { useCallback, useMemo } from 'react';

import { useQueryEmployees } from '@/net';
import { SelectStringList } from '@/ui';
import type { SelectStringListInfoType } from '@/ui/SelectStringList';
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
  const { data: dataEmployees } = useQueryEmployees();

  const itemsInfo = useMemo(() => {
    let result: SelectStringListInfoType[] = [
      { value: EMPTY_OPTION_VALUE, component: 'All employees' },
    ];
    if (dataEmployees) {
      result = [
        ...result,
        ...dataEmployees?.map((item) => ({
          value: String(item.employeeId),
          component: getEmployeeNameByData(item),
        })),
      ];
    }
    return result;
  }, [dataEmployees]);

  const setValue = useCallback(
    (value: string) =>
      setFilterEmployeeId(value === EMPTY_OPTION_VALUE ? null : +value),
    [setFilterEmployeeId],
  );

  return (
    <SelectStringList
      {...{ itemsInfo, setValue }}
      value={
        filterEmployeeId == null ? EMPTY_OPTION_VALUE : String(filterEmployeeId)
      }
      title="Filter by employee"
    />
  );
};

export default FilterEmployee;
