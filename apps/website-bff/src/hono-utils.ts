import { type Schema, type Hono, type Env, type MiddlewareHandler, type Input } from 'hono';

export const defineRoute = <E extends Env = Env, S extends Schema = Schema, BasePath extends string = '/'>(
  restFactory: (rest: Hono<E, S, BasePath>) => Hono<E, S, BasePath>
) => restFactory;

export const createMiddleware = <E extends Env = Env, P extends string = string, I extends Input = Input>(
  middleware: MiddlewareHandler<E, P, I>
) => middleware;
