'use server';

import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';

import db from '@/db';
import { session } from '@/db/schema';

import { auth } from './auth';

export const getUserInfo = async () => {
  const sessionCurrent = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionCurrent) return;

  const userId = sessionCurrent.user.id;

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

  return {
    sessions,
  };
};
