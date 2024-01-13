import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { timing } from 'hono/timing';

import { RegisterRoutes } from '../lib/routes';
import { provideContext } from './middlewares';
import { swaggerRoutes } from './routes';

const app = new Hono();

app.use(
  '*',
  // Global middlewares
  logger(),
  timing(),
  secureHeaders(),
  cors(),
  provideContext,
);

app.route('/', swaggerRoutes);

RegisterRoutes(app);

export default app.fetch;
export type AppType = typeof app;
