import type { User } from 'better-auth';

export const isAdmin = (user: User | undefined): boolean => {
  // if (Math.random() < 1) return true; // for testing only
  if (!user) return false;
  if (!('role' in user)) return false;
  if (typeof user.role !== 'string') return false;

  return user.role.split(',').includes('admin');
};
