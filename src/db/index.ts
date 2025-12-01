import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';
import invariant from 'tiny-invariant';

invariant(process.env.DATABASE_URL, 'No DATABASE_URL env variable');
const db = drizzle(process.env.DATABASE_URL);

export default db;
