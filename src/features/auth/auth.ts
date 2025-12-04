import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import invariant from 'tiny-invariant';

import db from '@/db';
import * as schema from '@/db/schema';

import { getBaseUrl } from './utilsAuth';

invariant(process.env.GOOGLE_CLIENT_ID);
invariant(process.env.GOOGLE_CLIENT_SECRET);

// NOTE: Required for "npx @better-auth/cli generate"
export const auth = betterAuth({
  baseURL: getBaseUrl(),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      accessType: 'offline',
      prompt: 'select_account consent',
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
});
