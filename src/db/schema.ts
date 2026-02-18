// db/schema.ts
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export * from './auth-schema';
export * from './cache-schema';
export * from './northwind-schema';

export const requestLogs = pgTable('request_logs', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  method: varchar('method', { length: 10 }).notNull(),
  url: text('url').notNull(),
  ip: varchar('ip', { length: 45 }),
  userAgent: text('user_agent'),
  statusCode: integer('status_code'),
  responseTimeMS: integer('response_time_ms'),
});
