import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';
import invariant from 'tiny-invariant';

import * as schema from './schema';

invariant(process.env.DATABASE_URL, 'No DATABASE_URL env variable');
const db = drizzle(process.env.DATABASE_URL, {
  // logger: true,
  schema,
});

export default db;
