import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { defineRoute } from '../../../hono-utils';

const bodySchema = z.object({
  prop: z.string(),
});

export const setRouteCreateAccount = defineRoute((rest) =>
  rest.post('/', zValidator('json', bodySchema), async (c) => {
    const body = c.req.valid('json');
    const output = await c.var.dep.createGame.execute(body);
    return c.json(output, 201);
  })
);
