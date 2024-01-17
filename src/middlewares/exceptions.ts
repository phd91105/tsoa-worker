import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

import { HttpStatus } from '@/enums/httpStatus';

export const notFoundHandler = (c: Context) => {
  return c.text('Not found.', HttpStatus.NOT_FOUND);
};

export const errorHandler = (e: Error, c: Context) => {
  if (e instanceof HTTPException) {
    return e.getResponse();
  }

  return c.text('Internal server error.', HttpStatus.INTERNAL_SERVER_ERROR);
};
