import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type IEmployee } from './models';
import {
  buildTitle,
  escapeHtml,
  formatDateFromString,
  formatYearsOldFromDateString,
  getCountries,
  getEmployeeNameByData,
  getFlagEmojiByCountryName,
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

describe('formatDateFromString', () => {
  it('returns N/A for null', () => {
    expect(formatDateFromString(null)).toBe('N/A');
  });

  it('returns formatted date for valid string', () => {
    const result = formatDateFromString('2020-01-15T00:00:00Z');
    expect(result).toMatch(/Jan 15, 2020/);
  });

  it('returns stringified Date for invalid date', () => {
    const result = formatDateFromString('invalid-date');
    expect(result).toContain('Invalid Date');
  });
});

describe('formatYearsOldFromDateString', () => {
  it('returns empty fragment when no dateString', () => {
    const el = formatYearsOldFromDateString('');
    expect(el).toBe(null);
  });

  it('returns correct years old string', () => {
    const now = new Date();
    const birth = new Date(
      now.getFullYear() - 25,
      now.getMonth(),
      now.getDate() - 1,
    );
    const str = formatYearsOldFromDateString(birth.toISOString());
    expect(str).toMatch(/25 years old/);
  });

  it('handles not yet birthday in current year', () => {
    const now = new Date();
    const birth = new Date(
      now.getFullYear() - 25,
      now.getMonth(),
      now.getDate() + 1,
    );
    const str = formatYearsOldFromDateString(birth.toISOString());
    expect(str).toMatch(/24 years old/);
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
      birthDate: '1990-05-15',
      employeeId: 1,
      homePhone: '(123) 456-7890',
      notes:
        'John is a dedicated software engineer with 5 years of experience.',
      reportsTo: 2,
      title: 'Software Engineer',
      photo: 'john_doe.jpg',
      photoPath: '/images/employees/john_doe.jpg',
      address: '123 Main St',
      city: 'Springfield',
      country: 'USA',
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
