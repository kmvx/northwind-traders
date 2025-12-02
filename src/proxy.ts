import { NextRequest, NextResponse } from 'next/server';

import logRequests from '@/db/logRequests';

export default async function proxy(request: NextRequest) {
  const { method, url, headers } = request;
  const userAgent = headers.get('user-agent');
  const ip = headers.get('x-forwarded-for');

  const startTime = Date.now();
  const response = await NextResponse.next();
  const responseTimeMS = Date.now() - startTime;

  const statusCode = response.status;

  if (new URL(url).searchParams.get('log') === 'true') {
    // NOTE: Don't wait
    logRequests({
      method,
      url,
      ip,
      userAgent,
      statusCode,
      responseTimeMS,
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.well-known|.*\\.png$|.*\\.jpg$).*)',
  ],
};
