'use client';

import React, { memo, useMemo } from 'react';

import { getCountries, getFlagEmojiByCountryName } from '@/utils';

import { SelectStringList, type SelectStringListInfoType } from '../../ui';

const EMPTY_OPTION_VALUE = 'worldwide';

interface FilterCountryProps<T extends string> {
  filterCountry: string;
  setFilterCountry: (country: string) => void;
  countryPropertyName?: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<T, any>[] | undefined;
}

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

  // Hide if there are no countries to choose.
  if (options.length <= 2) return null;

  return (
    <span className="font-flags">
      <SelectStringList
        itemsInfo={options.map(
          (option): SelectStringListInfoType => ({
            title:
              (getFlagEmojiByCountryName(option) ?? '') +
              ' \xa0 ' +
              (option || 'Worldwide'),
            value: option || EMPTY_OPTION_VALUE,
          }),
        )}
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

export default memo(FilterCountry);
