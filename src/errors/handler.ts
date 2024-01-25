import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

import { HttpStatus } from '@/enums/http';
import { NotFound } from '@/errors/exceptions';

export const notFoundHandler = () => {
  throw new NotFound();
};

export const errorHandler = (err: Error, ctx: Context) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return ctx.text(
    `Unexpected error: ${err.message}`,
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};
