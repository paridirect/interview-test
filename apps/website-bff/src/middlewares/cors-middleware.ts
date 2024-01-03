import { createMiddleware } from '../hono-utils';

export const corsMiddleware = createMiddleware(async (c, next) => {
  await next();

  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Credentials', 'true');
  c.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type');
  c.header('Access-Control-Max-Age', '86400');
});
