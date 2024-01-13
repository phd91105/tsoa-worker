import { Hono } from 'hono';
import swaggerSpec from '../config/swagger.json';
import swaggerUI from '../templates/swagger';

export const swaggerRoutes = new Hono();

swaggerRoutes.get('/docs', (c) => c.html(swaggerUI));
swaggerRoutes.get('/spec', (c) => c.json(swaggerSpec));
