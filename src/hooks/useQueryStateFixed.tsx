'use client';

import {
  type GenericParser,
  type Options,
  useQueryState,
  type UseQueryStateOptions,
  type UseQueryStateReturn,
} from 'nuqs';
import { useState } from 'react';

// useQueryState() calls useSearchParams() that requires <Suspense /> component.
// Fixing it.

function useQueryStateFixed<T>(
  key: string,
  options: UseQueryStateOptions<T> & {
    defaultValue: T;
  },
): UseQueryStateReturn<
  NonNullable<ReturnType<typeof options.parse>>,
  typeof options.defaultValue
>;

function useQueryStateFixed(
  key: string,
  options: Options & {
    defaultValue: string;
  } & { [K in keyof GenericParser<unknown>]?: never },
): UseQueryStateReturn<string, typeof options.defaultValue>;

function useQueryStateFixed<T>(
  key: string,
  options: UseQueryStateOptions<T>,
): UseQueryStateReturn<
  NonNullable<ReturnType<typeof options.parse>>,
  undefined
>;

function useQueryStateFixed(
  key: string,
  options: Pick<UseQueryStateOptions<string>, keyof Options>,
): UseQueryStateReturn<string, undefined>;

function useQueryStateFixed(
  key: string,
): UseQueryStateReturn<string, undefined>;

function useQueryStateFixed<T = string>(
  key: string,
  options: Partial<UseQueryStateOptions<T>> & {
    defaultValue?: T;
  } = {},
) {
  const [valueFallback, setValueFallback] = useState(options.defaultValue);
  try {
    const [value, setValue] = useQueryState(key, options);
    return [value, setValue] as const;
  } catch {
    return [valueFallback, setValueFallback] as const;
  }
}

export default useQueryStateFixed;
