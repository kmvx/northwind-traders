import type { InferSelectModel } from 'drizzle-orm';

import db from '@/db';
import { requestLogs } from '@/db/schema';

export default async function logRequests({
  method,
  url,
  ip,
  userAgent,
  statusCode,
  responseTimeMS,
}: Pick<
  InferSelectModel<typeof requestLogs>,
  'method' | 'url' | 'ip' | 'userAgent' | 'statusCode' | 'responseTimeMS'
>) {
  try {
    await db.insert(requestLogs).values({
      method,
      url,
      ip,
      userAgent,
      statusCode,
      responseTimeMS,
    });
  } catch (err) {
    console.error('HTTP Request logging failed:', err);
  }
}
