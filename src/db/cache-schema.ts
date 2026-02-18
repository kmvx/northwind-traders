import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

// ALTER TABLE query_cache SET UNLOGGED;
// TODO: DELETE FROM query_cache WHERE expires_at < NOW();
export const queryCache = pgTable('query_cache', {
  key: text('key').primaryKey(),
  data: jsonb('data').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});
