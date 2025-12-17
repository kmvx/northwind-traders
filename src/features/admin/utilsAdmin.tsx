import type { UserWithRole } from 'better-auth/client/plugins';

import type { Nullable } from '@/types';

export const isAdminUser = (
  user: Nullable<Pick<UserWithRole, 'role'>, 'role'> | undefined,
): boolean => {
  if (!user) return false;
  if (!('role' in user)) return false;
  if (typeof user.role !== 'string') return false;

  return user.role.split(',').includes('admin');
};
