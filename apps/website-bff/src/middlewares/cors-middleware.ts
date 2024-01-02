import { createMiddleware } from '../hono-utils';

export const corsMiddleware = createMiddleware(async (c, next) => {
  await next();

  const reqUrl = new URL(c.req.url);
  c.header('Access-Control-Allow-Origin', reqUrl.origin);
  c.header('Access-Control-Allow-Credentials', 'true');
  c.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type');
  c.header('Access-Control-Max-Age', '86400');
});
