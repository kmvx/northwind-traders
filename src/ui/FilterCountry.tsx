'use client';

import React, { memo, useCallback } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCountries, getFlagEmojiByCountryName } from '@/utils';

const EMPTY_OPTION_VALUE = 'world';

const FilterCountry: React.FC<{
  filterCountry: string;
  setFilterCountry: (country: string) => void;
  countries?: string[];
}> = ({ filterCountry, setFilterCountry, countries }) => {
  const options = ['', ...(countries || getCountries())];

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
