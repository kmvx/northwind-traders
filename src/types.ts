export type Nullable<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: T[P] | null | undefined;
};

declare const __brand: unique symbol;
export type Branded<T, Brand> = T & {
  readonly [__brand]: Brand;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const currencySymbol: unique symbol;
export type CurrencyType = Branded<number, typeof currencySymbol>;

export function asCurrencyType(value: number): CurrencyType {
  return value as CurrencyType;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const datastringSymbol: unique symbol;
export type DateStringType = Branded<string, typeof datastringSymbol>;

export function asDateStringType(value: string): DateStringType {
  return value as DateStringType;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const phoneSymbol: unique symbol;
export type PhoneType = Branded<string, typeof phoneSymbol>;

export function asPhoneType(value: string): PhoneType {
  return value as PhoneType;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const countrySymbol: unique symbol;
export type CountryType = Branded<string, typeof countrySymbol>;

export function asCountryType(value: string): CountryType {
  return value as CountryType;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const customerIdSymbol: unique symbol;
export type CustomerIdType = Branded<string, typeof customerIdSymbol>;

export function asCustomerIdType(value: string): CustomerIdType {
  return value as CustomerIdType;
}
