import { type Env, Hono, type Schema } from 'hono';

export const createRestApi = <E extends Env = Env, S extends Schema = Schema, BasePath extends string = '/'>() =>
  new Hono<E, S, BasePath>({ strict: false });
