import { createAuthClient } from 'better-auth/react';

import { getBaseUrl } from './utilsAuth';

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
});
