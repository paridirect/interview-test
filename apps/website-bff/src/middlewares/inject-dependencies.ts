import { createMiddleware } from '../hono-utils';

export const injectDependencies = (deps: Dependencies) =>
  createMiddleware(async (c, next) => {
    c.set('dep', deps);

    await next();
  });
