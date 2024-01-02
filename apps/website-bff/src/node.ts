import { showRoutes } from 'hono/dev';
import { serve } from '@hono/node-server';
import { createDependencies } from './create-dependencies';
import { createApp } from './create-app';

const deps = createDependencies(process.env);
const app = createApp(deps);
showRoutes(app);

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
