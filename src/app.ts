import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { RegisterRoutes } from '../build/routes';

const app = new Hono();

app.use(
  cors({
    origin: '*',
    allowMethods: ['post', 'put', 'get', 'delete', 'patch', 'options'],
    exposeHeaders: ['content-length', 'content-range'],
    credentials: true,
  }),
);

RegisterRoutes<Hono>(app);

export default app;
export type App = typeof app;
