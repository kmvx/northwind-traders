import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { asDateStringType } from '../types';
import { formatDateFromString, getRelativeTimeString } from './date';

describe('formatDateFromString', () => {
  it('returns N/A for null', () => {
    expect(formatDateFromString(null)).toBe('N/A');
  });

  it('returns formatted date for valid string', () => {
    const result = formatDateFromString(
      asDateStringType('2020-01-15T00:00:00Z'),
    );
    expect(result).toMatch(/Jan 15, 2020/);
  });

  it('returns stringified Date for invalid date', () => {
    const result = formatDateFromString(asDateStringType('invalid-date'));
    expect(result).toContain('Invalid Date');
  });
});

describe('getRelativeTimeString', () => {
  const now = new Date();
  const fixedNowMS = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      10, // 10:00
    ),
  ).getTime();

  beforeAll(() => {
    vi.setSystemTime(fixedNowMS);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  const HOUR = 3600e3;
  const DAY = HOUR * 24;

  it.each([
    // Seconds
    [0, 'now'],
    [-499, 'now'],
    [499, 'now'],
    [-1000, '1 second ago'],
    [1000, 'in 1 second'],
    [-44500, '44 seconds ago'],
    [45500, 'in 46 seconds'],

    // Minutes
    [-60e3, '1 minute ago'],
    [-119e3, '2 minutes ago'],
    [3 * 60e3, 'in 3 minutes'],
    [44.4 * 60e3, 'in 44 minutes'],
    [44.6 * 60e3, 'in 45 minutes'],

    // Hours
    [-HOUR, '1 hour ago'],
    [5 * HOUR, 'in 5 hours'],
    [-23.4 * HOUR, '23 hours ago'],
    [23.6 * HOUR, 'in 24 hours'],

    // Days
    [-1 * DAY, 'yesterday'],
    [1 * DAY, 'tomorrow'],
    [-2 * DAY, '2 days ago'],
    [7 * DAY, 'in 7 days'],
    [29 * DAY, 'in 29 days'],

    // Months
    [-30 * DAY, 'last month'],
    [-61 * DAY, '2 months ago'],
    [6 * 30 * DAY, 'in 6 months'],

    // Years
    [-365 * DAY, 'last year'],
    [-730 * DAY, '2 years ago'],
    [10 * 365 * DAY, 'in 10 years'],
    [500 * 365 * DAY, 'in 500 years'],
  ] as const)('getRelativeTimeString(%d) -> %s', (deltaMs, expected) => {
    const date = new Date(fixedNowMS + deltaMs);
    expect(getRelativeTimeString(date)).toBe(expected);
  });
});
