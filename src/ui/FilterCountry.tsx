'use client';

import React, { memo, useCallback, useMemo } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCountries, getFlagEmojiByCountryName } from '@/utils';

const EMPTY_OPTION_VALUE = 'world';

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
        data?.map((item) => String(item[countryPropertyName]))
      )?.sort() ?? getCountries()),
    ];
  }, [countryPropertyName, data]);

  const handleValueChange = useCallback(
    (country: string) => {
      setFilterCountry(country === EMPTY_OPTION_VALUE ? '' : country);
    },
    [setFilterCountry],
  );

  return (
    <Select
      value={filterCountry || EMPTY_OPTION_VALUE}
      onValueChange={handleValueChange}
    >
      <SelectTrigger>
        <SelectValue placeholder={<Item option={''} />} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option || EMPTY_OPTION_VALUE}>
            <Item option={option} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

function Item({ option }: { option: string }) {
  return (
    <span className="font-flags">
      {getFlagEmojiByCountryName(option)} &nbsp; {option || 'World'}
    </span>
  );
}

export default memo(FilterCountry);
