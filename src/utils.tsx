import { type IEmployee } from './models';

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
    console.log('Unknown country', country);
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
