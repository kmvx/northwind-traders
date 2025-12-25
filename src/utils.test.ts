import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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
  getCountries,
  getEmployeeNameByData,
  getFlagEmojiByCountryName,
  isStringIncludes,
  joinFields,
  setDocumentTitle,
} from './utils';

describe('joinFields', () => {
  it.each([
    [['a', 'b', 'c'], 'a, b, c'],
    [['a', '', 'b', undefined as unknown as string], 'a, b'],
  ])('"%s" -> "%s"', (input, expected) => {
    expect(joinFields(...input)).toBe(expected);
  });
});

describe('formatCurrency', () => {
  it.each([
    [castToCurrency(-12_345_678.955), '-$12,345,678.96'],
    [castToCurrency(0.005), '$0.01'],
    [castToCurrency(0.004), '$0.00'],
    [null, 'N/A'],
  ])('%j -> %s', (input, expected) => {
    expect(formatCurrency(input)).toBe(expected);
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
  it.each([
    ['hello world', 'world', true],
    ['Hello World', 'WORLD', true],
    ['HELLO WORLD', 'hello', true],
    ['hello world', 'foo', false],
  ])('isStringIncludes(%s, %s) -> %s', (str, search, expected) => {
    expect(isStringIncludes(str, search)).toBe(expected);
  });
});

describe('buildTitle', () => {
  it.each([
    [[], 'Northwind Traders'],
    [['Dashboard'], 'Dashboard — Northwind Traders'],
    [['Products', 'Categories'], 'Products — Categories — Northwind Traders'],
  ])('buildTitle(%j) -> %s', (args, expected) => {
    expect(buildTitle(...args)).toBe(expected);
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
  it.each([
    [
      {
        titleOfCourtesy: 'Mr.',
        lastName: 'Doe',
        firstName: 'John',
        birthDate: castToDateString('1990-05-15'),
        hireDate: castToDateString('2020-05-15'),
        employeeId: 1,
        homePhone: castToPhone('(123) 456-7890'),
        extension: castToPhone('1234'),
        notes:
          'John is a dedicated software engineer with 5 years of experience.',
        reportsTo: 2,
        title: 'Software Engineer',
        photoPath: '/images/employees/john_doe.jpg',
        address: '123 Main St',
        city: 'Springfield',
        country: castToCountry('USA'),
        postalCode: '62701',
        region: 'IL',
      } as IEmployee,
      'Mr. John Doe',
    ],
  ])('getEmployeeNameByData(%j) -> %s', (employee, expected) => {
    expect(getEmployeeNameByData(employee)).toBe(expected);
  });
});

describe('getFlagEmojiByCountryName', () => {
  it.each([
    ['', '🇺🇳'],
    ['Argentina', '🇦🇷'],
    ['Narnia', '🏴‍☠'],
  ])('getFlagEmojiByCountryName(%s) -> %s', (country, expected) => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(getFlagEmojiByCountryName(country)).toBe(expected);

    if (country === 'Narnia') {
      expect(consoleSpy).toHaveBeenCalledWith('Unknown country', 'Narnia');
    } else {
      expect(consoleSpy).not.toHaveBeenCalled();
    }

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
  it.each([
    ['&<>"\'/', '&amp;&lt;&gt;&quot;&#39;&#x2F;'],
    ['Hello & <World>!', 'Hello &amp; &lt;World&gt;!'],
  ])('escapeHtml(%s) -> %s', (input, expected) => {
    expect(escapeHtml(input)).toBe(expected);
  });
});
