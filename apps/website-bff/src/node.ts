import { showRoutes } from 'hono/dev';
import { serve } from '@hono/node-server';
import { createDependencies } from './create-dependencies';
import { createApp } from './create-app';
import { generateGames, seedGames } from '@paridirect/business';

const deps = createDependencies(process.env);
const app = createApp(deps);
showRoutes(app);
await seedGames(deps.gameRepo, generateGames()); // seed the repository with games for mocking purposes

serve(
  {
    fetch: app.fetch,
    hostname: '127.0.0.1',
    port: 3202,
  },
  (ls) => {
    console.log(`Listening on http://${ls.address}:${ls.port}`);
  }
);
