import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { timing } from 'hono/timing';

import { RegisterRoutes } from '../lib/routes';

const app = new Hono();

app.use(
  '*',
  // Global middlewares
  timing(),
  secureHeaders(),
  cors(),
);

RegisterRoutes(app);

export default app.fetch;
export type AppType = typeof app;
