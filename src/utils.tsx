import { type IEmployee } from './models';

export function joinFields(...args: string[]): string {
  return [...args].filter(Boolean).join(', ');
}

export function formatDateFromString(date: string | null): string {
  if (!date) return 'N/A';
  const dataObject = new Date(date);
  if (isNaN(dataObject as unknown as number)) return `${dataObject}`;
  return `${dataObject.toLocaleString('default', {
    month: 'short',
  })} ${dataObject.getDate()}, ${dataObject.getFullYear()}`;
}

export function formatYearsOldFromDateString(
  dateString: string,
): string | null {
  if (!dateString) return null;
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return `${age} years old`;
}

export function dateFromString(str: string | null): Date {
  if (str == null) return new Date(NaN);

  // If the string is in ISO format without timezone, append 'Z' to treat it as UTC
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(str)) {
    return new Date(str + 'Z');
  }

  return new Date(str);
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
