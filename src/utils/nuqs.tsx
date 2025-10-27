import { createParser, parseAsBoolean } from 'nuqs';

export const parseAsBooleanOrUndefined = createParser<boolean | null>({
  parse(queryValue) {
    return parseAsBoolean.parse(queryValue);
  },
  serialize(value) {
    return value == null ? '' : parseAsBoolean.serialize(value);
  },
});
