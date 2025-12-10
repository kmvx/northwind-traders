import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { type IEmployee } from './models';
import {
  castToCountry,
  castToCurrency,
  castToDateString,
  castToPhone,
} from './types';
import {
  buildTitle,
  capitalizeFirstLetter,
  escapeHtml,
  formatCurrency,
  formatDateFromString,
  getCountries,
  getEmployeeNameByData,
  getFlagEmojiByCountryName,
  getRelativeTimeString,
  isStringIncludes,
  joinFields,
  setDocumentTitle,
} from './utils';

describe('joinFields', () => {
  it('joins non-empty strings with comma', () => {
    expect(joinFields('a', 'b', 'c')).toBe('a, b, c');
  });

  it('filters out falsy values', () => {
    expect(joinFields('a', '', 'b', undefined as unknown as string)).toBe(
      'a, b',
    );
  });
});

describe('formatCurrency', () => {
  it('format currency', () => {
    expect(formatCurrency(castToCurrency(-12_345_678.955))).toBe(
      '-$12,345,678.96',
    );
    expect(formatCurrency(castToCurrency(0.005))).toBe('$0.01');
    expect(formatCurrency(castToCurrency(0.004))).toBe('$0.00');
  });
});

describe('formatDateFromString', () => {
  it('returns N/A for null', () => {
    expect(formatDateFromString(null)).toBe('N/A');
  });

  it('returns formatted date for valid string', () => {
    const result = formatDateFromString(
      castToDateString('2020-01-15T00:00:00Z'),
    );
    expect(result).toMatch(/Jan 15, 2020/);
  });

  it('returns stringified Date for invalid date', () => {
    const result = formatDateFromString(castToDateString('invalid-date'));
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

describe('capitalizeFirstLetter', () => {
  it.each([
    ['', ''],
    [' ', ' '],
    ['ABC', 'ABC'],
    ['abc', 'Abc'],
    ['javaScript', 'JavaScript'],
  ])('capitalizes "%s" -> "%s"', (input, expected) => {
    expect(capitalizeFirstLetter(input)).toBe(expected);
  });
});

describe('isStringIncludes', () => {
  it('should return true when search string is found (exact case)', () => {
    expect(isStringIncludes('hello world', 'world')).toBe(true);
  });

  it('should return true when search string is found (case insensitive)', () => {
    expect(isStringIncludes('Hello World', 'WORLD')).toBe(true);
    expect(isStringIncludes('HELLO WORLD', 'hello')).toBe(true);
  });

  it('should return false when search string is not found', () => {
    expect(isStringIncludes('hello world', 'foo')).toBe(false);
  });
});

describe('buildTitle', () => {
  it('should handle no arguments', () => {
    expect(buildTitle()).toBe('Northwind Traders');
  });

  it('should append application name to single argument', () => {
    expect(buildTitle('Dashboard')).toBe('Dashboard — Northwind Traders');
  });

  it('should join multiple strings', () => {
    expect(buildTitle('Products', 'Categories')).toBe(
      'Products — Categories — Northwind Traders',
    );
  });
});

const originalDocument = global.document;

describe('setDocumentTitle', () => {
  beforeEach(() => {
    // @ts-expect-error Override
    global.document = { title: '' };
  });

  afterEach(() => {
    global.document = originalDocument;
  });

  it('sets document.title using buildTitle', () => {
    const spy = vi
      .spyOn(global, 'document', 'get')
      .mockReturnValue({ title: '' } as typeof originalDocument);
    setDocumentTitle('Test');
    expect(global.document.title).toBe(buildTitle('Test'));
    spy.mockRestore();
  });

  it('does nothing if document is undefined', () => {
    // @ts-expect-error Intentionally undefined
    global.document = undefined;
    expect(() => setDocumentTitle('Ignored')).not.toThrow();
  });
});

describe('getEmployeeNameByData', () => {
  it('should return concatenated employee name', () => {
    const employee: IEmployee = {
      titleOfCourtesy: 'Mr.',
      lastName: 'Doe',
      firstName: 'John',
      birthDate: castToDateString('1990-05-15'),
      employeeId: 1,
      homePhone: castToPhone('(123) 456-7890'),
      notes:
        'John is a dedicated software engineer with 5 years of experience.',
      reportsTo: 2,
      title: 'Software Engineer',
      photo: 'john_doe.jpg',
      photoPath: '/images/employees/john_doe.jpg',
      address: '123 Main St',
      city: 'Springfield',
      country: castToCountry('USA'),
      postalCode: '62701',
      region: 'IL',
    };
    expect(getEmployeeNameByData(employee)).toBe('Mr. John Doe');
  });
});

describe('getFlagEmojiByCountryName', () => {
  it('should return UN flag for empty or falsy country', () => {
    expect(getFlagEmojiByCountryName('')).toBe('🇺🇳');
  });

  it('should return flag emoji for known country', () => {
    expect(getFlagEmojiByCountryName('Argentina')).toBe('🇦🇷');
  });

  it('should return pirate flag and log for unknown country', () => {
    const consoleSpy = vi.spyOn(console, 'error');
    expect(getFlagEmojiByCountryName('Narnia')).toBe('🏴‍☠');
    expect(consoleSpy).toHaveBeenCalledWith('Unknown country', 'Narnia');
    consoleSpy.mockRestore();
  });
});

describe('getCountries', () => {
  it('should return array of country names', () => {
    const countries = getCountries();
    expect(countries).toContain('Argentina');
    expect(countries).toContain('USA');
    expect(countries.length).toBe(25);
  });
});

describe('escapeHtml', () => {
  it('escapes special HTML characters', () => {
    expect(escapeHtml('&<>"\'/')).toBe('&amp;&lt;&gt;&quot;&#39;&#x2F;');
  });

  it('handles mixed string with special and non-special characters', () => {
    const input = 'Hello & <World>!';
    const expected = 'Hello &amp; &lt;World&gt;!';
    expect(escapeHtml(input)).toBe(expected);
  });
});
