import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, oAuthProxy } from 'better-auth/plugins';
import { genericOAuth } from 'better-auth/plugins';
import invariant from 'tiny-invariant';

import db from '@/db';
import * as schema from '@/db/schema';

invariant(process.env.GOOGLE_CLIENT_ID);
invariant(process.env.GOOGLE_CLIENT_SECRET);

// NOTE: Required for "npx @better-auth/cli generate"
export const auth = betterAuth({
  plugins: [
    admin(),
    oAuthProxy(),
    genericOAuth({
      config: [
        {
          providerId: 'clerk',
          clientId: process.env.CLERK_CLIENT_ID ?? '',
          clientSecret: process.env.CLERK_CLIENT_SECRET,
          discoveryUrl: process.env.CLERK_DISCOVERY_URL,
        },
      ],
    }),
  ],
  trustedOrigins: [
    process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : '',
  ].filter(Boolean),
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
