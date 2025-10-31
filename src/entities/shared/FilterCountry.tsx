'use client';

import { memo, useMemo } from 'react';

import { getCountries, getFlagEmojiByCountryName } from '@/utils';

import { SelectStringList } from '../../ui';

const EMPTY_OPTION_VALUE = 'worldwide';

type FilterCountryProps<T extends string> = {
  filterCountry: string;
  setFilterCountry: (country: string) => void;
  countryPropertyName?: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<T, any>[] | undefined;
};

const FilterCountry = <T extends string>({
  filterCountry,
  setFilterCountry,
  countryPropertyName = 'country' as T,
  data,
}: FilterCountryProps<T>) => {
  const options = useMemo(() => {
    return [
      '',
      ...((
        countryPropertyName &&
        data && [
          ...new Set(data.map((item) => String(item[countryPropertyName]))),
        ]
      )?.sort() ?? getCountries()),
    ];
  }, [countryPropertyName, data]);

  return (
    <span className="font-flags">
      <SelectStringList
        itemsInfo={options.map((option) => ({
          component: <Item option={option} />,
          value: option || EMPTY_OPTION_VALUE,
        }))}
        value={filterCountry || EMPTY_OPTION_VALUE}
        setValue={(value) =>
          setFilterCountry(value === EMPTY_OPTION_VALUE ? '' : value)
        }
        title="Filter by country"
        className="font-flags"
      />
    </span>
  );
};

function Item({ option }: { option: string }) {
  return (
    <>
      {getFlagEmojiByCountryName(option)} &nbsp; {option || 'Worldwide'}
    </>
  );
}

export default memo(FilterCountry);
