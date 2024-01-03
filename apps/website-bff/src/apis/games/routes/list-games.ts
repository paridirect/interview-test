import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { generateGames } from '@paridirect/business';
import { GetManyOrder } from '@paridirect/toolbox';
import { defineRoute } from '../../../hono-utils';

const querySchema = z.object({
  providerId: z.string().optional(),
  limit: z.string().optional(),
  order: z.nativeEnum(GetManyOrder).optional(),
  cursor: z.string().optional(),
});

export const setRouteListGames = defineRoute((rest) =>
  rest.get('/', zValidator('query', querySchema), async (c) => {
    const query = c.req.valid('query');
    // TODO: Implement this route
    return c.json({ items: generateGames(), cursor: null }, 200);
  })
);
