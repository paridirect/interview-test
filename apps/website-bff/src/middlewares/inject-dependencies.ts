import { createMiddleware } from 'hono/factory';

export const injectDependencies = <T extends Record<string, any>>(deps: T) =>
  createMiddleware(async (c, next) => {
    c.set('deps', deps);

    await next();
  });
