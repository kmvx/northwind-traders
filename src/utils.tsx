import type { LucideIcon } from 'lucide-react';
import invariant from 'tiny-invariant';

import { navigationItems } from './constants';
import { type IEmployee } from './models';
import type { CurrencyType } from './types';

export * from './utils/date';

export function hasKey<K extends string>(
  obj: object,
  key: K,
): obj is Record<K, unknown> {
  return key in obj;
}

export function normalizeError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error));
}

export function joinFields(...args: (string | null)[]): string {
  return [...args].filter(Boolean).join(', ');
}

export async function traceDuration<T>(
  label: string,
  fn: () => Promise<T> | T,
): Promise<T> {
  const start = performance.now();
  try {
    const result = await fn();
    return result;
  } finally {
    console.log(`[${label}] Execution time: ${performance.now() - start}ms`);
  }
}

export function formatCurrency(amount: CurrencyType | null): string {
  if (amount == null) return 'N/A';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isStringIncludes(str: string | null, search: string): boolean {
  if (!str) return false;

  const strConverted = typeof str === 'string' ? str : '' + str;
  const searchConverted = typeof search === 'string' ? search : '' + search;
  return (
    strConverted.toLowerCase().indexOf(searchConverted.toLowerCase()) !== -1
  );
}

export const buildTitle = (...args: (string | null | undefined)[]): string => {
  return [...args, 'Northwind Traders'].filter(Boolean).join(' | ');
};

export function getEmployeeNameByData(
  data: Pick<IEmployee, 'titleOfCourtesy' | 'firstName' | 'lastName'>,
) {
  return data.titleOfCourtesy + ' ' + data.firstName + ' ' + data.lastName;
}

const countryFlagEmojiByCountryName: Record<string, string> = {
  Argentina: '🇦🇷',
  Australia: '🇦🇺',
  Austria: '🇦🇹',
  Belgium: '🇧🇪',
  Brazil: '🇧🇷',
  Canada: '🇨🇦',
  Denmark: '🇩🇰',
  Finland: '🇫🇮',
  France: '🇫🇷',
  Germany: '🇩🇪',
  Ireland: '🇮🇪',
  Italy: '🇮🇹',
  Japan: '🇯🇵',
  Mexico: '🇲🇽',
  Netherlands: '🇳🇱',
  Norway: '🇳🇴',
  Poland: '🇵🇱',
  Portugal: '🇵🇹',
  Singapore: '🇸🇬',
  Spain: '🇪🇸',
  Sweden: '🇸🇪',
  Switzerland: '🇨🇭',
  UK: '🇬🇧',
  USA: '🇺🇸',
  Venezuela: '🇻🇪',
};

export function getFlagEmojiByCountryName(
  country: string | null,
): string | undefined {
  if (country === '') return '🇺🇳';
  if (country == null) return '🏴‍☠';
  const emoji = countryFlagEmojiByCountryName[country];
  if (!emoji) {
    console.error('Unknown country', country);
    return '🏴‍☠';
  }
  return emoji;
}

export function getCountries(): string[] {
  return Object.keys(countryFlagEmojiByCountryName);
}

export const escapeHtml = (text: string): string => {
  return text.replace(/[&<>"'/]/g, (char) => {
    const escapeMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
    };
    return escapeMap[char] || char;
  });
};

export function withWaitCursor<T>(fn: () => T) {
  const isClientSide = typeof document !== 'undefined';
  const CSS_CLASSES = ['cursor-wait', '[*]:cursor-wait'] as const;
  try {
    if (isClientSide) {
      CSS_CLASSES.forEach((token) =>
        document.documentElement.classList.add(token),
      );
    }
    return fn();
  } finally {
    if (isClientSide) {
      CSS_CLASSES.forEach((token) =>
        document.documentElement.classList.remove(token),
      );
    }
  }
}

export const remToPx = (rem: number): number =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

interface InfoByIPAddressData {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  org: string;
}

export const fetchInfoByIPAddress = async (
  ipAddress: string | null | undefined,
) => {
  if (ipAddress === null) return null;

  const response = await fetch(
    `https://ipapi.co/${ipAddress === '127.0.0.1' || ipAddress === undefined ? '' : ipAddress + '/'}json/`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch location data');
  }

  return (await response.json()) as Partial<InfoByIPAddressData>;
};

export function getNavigationIconByUrl(url: string): LucideIcon {
  const item = navigationItems
    .flatMap((group) => group.children)
    .find((navigationItem) => navigationItem.url === url);
  invariant(item);
  return item.icon;
}
