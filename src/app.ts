import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';

import { errorHandler, notFoundHandler } from '@/errors/handler';
import { provideContext } from '@/middlewares/context';
import { RegisterRoutes } from '@/routes';

const app = new Hono();

app.use(
  '*',
  /**
   * Global middlewares
   */
  cors(),
  secureHeaders(),
  provideContext(),
);

/**
 * Generated routes from controllers
 */
RegisterRoutes(app);

/**
 * Error handlers
 */
app.notFound(notFoundHandler);
app.onError(errorHandler);

export default app;
