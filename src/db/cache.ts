import { and, eq, gt } from 'drizzle-orm';
import invariant from 'tiny-invariant';

import db from '.';
import { queryCache } from './cache-schema';

export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMS: number = 60e3,
): Promise<T> {
  const now = new Date();

  const cached = await db
    .select()
    .from(queryCache)
    .where(and(eq(queryCache.key, key), gt(queryCache.expiresAt, now)));

  invariant(cached.length <= 1);

  if (cached.length > 0) {
    return cached[0].data as T;
  } else {
    const freshData = await fetcher();
    const expiresAt = new Date(now.getTime() + ttlMS);

    await db
      .insert(queryCache)
      .values({
        key,
        data: freshData,
        expiresAt,
      })
      .onConflictDoUpdate({
        target: queryCache.key,
        set: {
          data: freshData,
          expiresAt,
        },
      });

    return freshData;
  }
}
