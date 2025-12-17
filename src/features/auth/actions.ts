'use server';

import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import invariant from 'tiny-invariant';

import db from '@/db';
import { account, session } from '@/db/schema';

import { isAdminUser } from '../admin';
import { auth } from './auth';

export const getUserAccounts = async (userId: string) => {
  const sessionCurrent = await auth.api.getSession({
    headers: await headers(),
  });

  invariant(sessionCurrent);

  const currentUserId = sessionCurrent.user.id;
  if (currentUserId !== userId && !isAdminUser(sessionCurrent.user)) {
    throw new Error('Permission denied');
  }

  const accounts = await db
    .select({
      id: account.id,
      providerId: account.providerId,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      accessTokenExpiresAt: account.accessTokenExpiresAt,
      refreshTokenExpiresAt: account.refreshTokenExpiresAt,
    })
    .from(account)
    .where(eq(account.userId, userId));

  return accounts;
};

export const getUserSessions = async (userId: string) => {
  const sessionCurrent = await auth.api.getSession({
    headers: await headers(),
  });

  invariant(sessionCurrent);

  const currentUserId = sessionCurrent.user.id;
  if (currentUserId !== userId && !isAdminUser(sessionCurrent.user)) {
    throw new Error('Permission denied');
  }

  const sessions = await db
    .select({
      id: session.id,
      userAgent: session.userAgent,
      ipAddress: session.ipAddress,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      expiresAt: session.expiresAt,
    })
    .from(session)
    .where(eq(session.userId, userId));

  return sessions;
};
