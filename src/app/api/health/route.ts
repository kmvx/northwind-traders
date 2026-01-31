import { getDBHealthStatus } from '@/db/actions';

export async function GET() {
  try {
    if (await getDBHealthStatus()) {
      return new Response('OK', {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  } catch (error) {
    console.error('Health check failed:', error);
  }
  return new Response('ERROR', {
    status: 500,
    headers: { 'Content-Type': 'text/plain' },
  });
}
