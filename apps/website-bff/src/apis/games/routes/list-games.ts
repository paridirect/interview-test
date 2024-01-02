import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { defineRoute } from '../../../hono-utils';

const querySchema = z.object({
  prop: z.string(),
});

export const setRouteListGames = defineRoute((rest) =>
  rest.get('/', zValidator('query', querySchema), async (c) => {
    const query = c.req.valid('query');
    // TODO: Implement this route
  })
);
