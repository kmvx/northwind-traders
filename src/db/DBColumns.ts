import { customType } from 'drizzle-orm/pg-core';

import {
  asCountryType,
  asCurrencyType,
  asDateStringType,
  asPhoneType,
  type CountryType,
  type CurrencyType,
  type DateStringType,
  type PhoneType,
} from '@/types';

export const brandedCurrencyDBColumn = customType<{
  data: CurrencyType;
  driverData: number;
}>({
  dataType: () => 'real',
  fromDriver: (value: number): CurrencyType => asCurrencyType(value),
  toDriver: (value: CurrencyType): number => value,
});

export const brandedDateStringDBColumn = customType<{
  data: DateStringType;
  driverData: string;
}>({
  dataType: () => 'varchar',
  fromDriver: (value: string): DateStringType => asDateStringType(value),
  toDriver: (value: DateStringType): string => value,
});

export const brandedPhoneDBColumn = customType<{
  data: PhoneType;
  driverData: string;
}>({
  dataType: () => 'varchar(24)',
  fromDriver: (value: string): PhoneType => asPhoneType(value),
  toDriver: (value: PhoneType): string => value,
});

export const brandedCountryDBColumn = customType<{
  data: CountryType;
  driverData: string;
}>({
  dataType: () => 'varchar(15)',
  fromDriver: (value: string): CountryType => asCountryType(value),
  toDriver: (value: CountryType): string => value,
});

export const integerBooleanDBColumn = customType<{
  data: boolean;
  driverData: number;
}>({
  dataType: () => 'integer',
  fromDriver: (value: number): boolean => value !== 0,
  toDriver: (value: boolean): number => (value ? 1 : 0),
});
