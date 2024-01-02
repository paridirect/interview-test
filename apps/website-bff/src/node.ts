import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ message: 'Hello World!' });
});

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
