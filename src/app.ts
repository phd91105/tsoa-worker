import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';

import { provideContext } from '@/middlewares/context';
import { errorHandler, notFoundHandler } from '@/middlewares/exceptions';
import { RegisterRoutes } from '@/routes';

const app = new Hono();

// Global middlewares
app.use(
  '*',
  //
  cors(),
  logger(),
  secureHeaders(),
  provideContext(),
);

// Generated routes from controllers
RegisterRoutes(app);

// Error handlers
app.notFound(notFoundHandler);
app.onError(errorHandler);

export default app;
