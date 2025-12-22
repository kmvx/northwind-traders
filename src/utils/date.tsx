import invariant from 'tiny-invariant';

import type { DateStringType } from '@/types';

export function formatDateFromString(date: DateStringType | null): string {
  if (!date) return 'N/A';
  const dataObject = new Date(date);
  if (isNaN(dataObject as unknown as number)) return `${dataObject}`;
  return `${dataObject.toLocaleString('en-US', {
    month: 'short',
  })} ${dataObject.getDate()}, ${dataObject.getFullYear()}`;
}

export function dateFromString(str: DateStringType | null): Date {
  if (str == null) return new Date(NaN);

  // If the string is in ISO format without timezone, append 'Z' to treat it as UTC
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(str)) {
    return new Date(str + 'Z');
  }

  return new Date(str);
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

const units: [number, Intl.RelativeTimeFormatUnit][] = [
  [60 * 60 * 24 * 365, 'year'],
  [60 * 60 * 24 * 30, 'month'],
  [60 * 60 * 24, 'day'],
  [60 * 60, 'hour'],
  [60, 'minute'],
  [1, 'second'],
];

export function getRelativeTimeString(date: Date): string {
  const diffSeconds = (date.getTime() - Date.now()) / 1000;
  const absSeconds = Math.abs(diffSeconds);

  for (const [thresholdSeconds, unit] of units) {
    if (absSeconds >= thresholdSeconds || unit === 'second') {
      return rtf.format(Math.round(diffSeconds / thresholdSeconds), unit);
    }
  }

  invariant(false); // unreachable
}
