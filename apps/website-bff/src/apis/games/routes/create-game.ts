import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { defineRoute } from '../../../hono-utils';

const bodySchema = z.object({
  providerId: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
});

export const setRouteCreateAccount = defineRoute((rest) =>
  rest.post('/', zValidator('json', bodySchema), async (c) => {
    const body = c.req.valid('json');
    await c.var.dep.createGame.execute(body);
    return c.json({ message: 'OK' }, 201);
  })
);
