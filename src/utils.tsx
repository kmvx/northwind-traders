import { type IEmployee } from './models';
import type { CurrencyType } from './types';

export * from './utils/date';

export function joinFields(...args: string[]): string {
  return [...args].filter(Boolean).join(', ');
}

export function formatCurrency(amount: CurrencyType): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isStringIncludes(str: string, search: string): boolean {
  const strConverted = typeof str === 'string' ? str : '' + str;
  const searchConverted = typeof search === 'string' ? search : '' + search;
  return (
    strConverted.toLowerCase().indexOf(searchConverted.toLowerCase()) !== -1
  );
}

export const buildTitle = (...args: (string | undefined)[]): string => {
  return [...args, 'Northwind Traders'].filter(Boolean).join(' \u2014 ');
};

export const setDocumentTitle = (...args: (string | undefined)[]): void => {
  if (typeof document === 'undefined') return;
  document.title = buildTitle(...args);
};

export function getEmployeeNameByData(data: IEmployee) {
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

export function getFlagEmojiByCountryName(country: string): string | undefined {
  if (!country) return '🇺🇳';
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
  city: string;
  region: string;
  country_name: string;
  org: string;
}

export const fetchInfoByIPAddress = async (ipAddress: string | null) => {
  if (!ipAddress) return;

  const response = await fetch(
    `https://ipapi.co/${ipAddress === '127.0.0.1' ? '' : ipAddress}/json/`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch location data');
  }

  return (await response.json()) as Partial<InfoByIPAddressData>;
};
