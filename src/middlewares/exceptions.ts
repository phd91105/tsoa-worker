import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

import { HttpStatus } from '@/enums/http.status';
import { NotFound } from '@/exceptions/http.exceptions';

export const notFoundHandler = () => {
  throw new NotFound();
};

export const errorHandler = (e: Error, c: Context) => {
  if (e instanceof HTTPException) {
    return e.getResponse();
  }

  return c.text('Internal server error.', HttpStatus.INTERNAL_SERVER_ERROR);
};
