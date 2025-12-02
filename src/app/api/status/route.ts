import os from 'os';

const start = new Date();

export async function GET(request: Request) {
  console.log('/api/status:', request.url, new Date().toISOString());
  const now = new Date();
  return Response.json({
    app: {
      startTime: start.toISOString(),
      nowTime: now.toISOString(),
      uptimeRouteSeconds: (now.getTime() - start.getTime()) / 1e3,
      uptimeSeconds: process.uptime(),
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
      NODE_ENV: process.env.NODE_ENV,
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
  });
}
