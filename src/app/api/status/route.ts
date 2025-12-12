import os from 'os';

const start = new Date();

export async function GET(request: Request) {
  console.log('/api/status:', request.url, new Date().toISOString());
  const now = new Date();

  const result = {
    app: {
      startTime: start.toISOString(),
      nowTime: now.toISOString(),
      uptimeRouteSeconds: (now.getTime() - start.getTime()) / 1e3,
      uptimeSeconds: process.uptime(),
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL_length: process.env.DATABASE_URL?.length,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_TARGET_ENV: process.env.VERCEL_TARGET_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      VERCEL_BRANCH_URL: process.env.VERCEL_BRANCH_URL,
      VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
      VERCEL_SKEW_PROTECTION_ENABLED:
        process.env.VERCEL_SKEW_PROTECTION_ENABLED,
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
      BETTER_AUTH_SECRET_length: process.env.BETTER_AUTH_SECRET?.length,
      GOOGLE_CLIENT_ID_length: process.env.GOOGLE_CLIENT_ID?.length,
      GOOGLE_CLIENT_SECRET_length: process.env.GOOGLE_CLIENT_SECRET?.length,
      CLERK_CLIENT_ID_length: process.env.CLERK_CLIENT_ID?.length,
      CLERK_CLIENT_SECRET_length: process.env.CLERK_CLIENT_SECRET?.length,
      CLERK_DISCOVERY_URL_length: process.env.CLERK_DISCOVERY_URL?.length,
    },
    node: {
      version: process.version,
      platform: os.platform(),
      arch: os.arch(),
    },
    memory: {
      totalmem_Gbytes: os.totalmem() / 1e9,
      freemem_Gbytes: os.freemem() / 1e9,
      memoryUsage: process.memoryUsage(),
    },
    cpu: {
      loadavg: os.loadavg(),
      cpuUsage: process.cpuUsage(),
      cpusCount: os.cpus().length,
      cpus: os.cpus(),
    },
    headers: Object.fromEntries(request.headers.entries()),
  };

  return new Response(JSON.stringify(result, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
