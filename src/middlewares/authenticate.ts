import type { MiddlewareHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { verify } from 'hono/jwt';

import { HttpStatus } from '@/enums/httpStatus';

export enum SecurityType {
  jwt = 'jwt',
  oauth2 = 'oauth2',
}

export const authenticationHandler = (
  security: [{ jwt: string[] }],
): MiddlewareHandler => {
  const [authProvider] = security;
  const permission = authProvider[SecurityType.jwt];

  return async (c, next) => {
    const authHeader = c.req.header('authorization');

    if (!authHeader || !authHeader.toLowerCase().startsWith('bearer')) {
      throw new HTTPException(HttpStatus.UNAUTHORIZED, {
        message: 'Unauthorized.',
      });
    }

    const bearer = authHeader.slice(7);
    let payload = null;
    try {
      payload = await verify(bearer, c.env.SECRET);
    } catch (error) {
      throw new HTTPException(HttpStatus.UNAUTHORIZED, {
        message: 'Unauthorized.',
      });
    }

    if (permission.length && !permission.includes(payload.role)) {
      throw new HTTPException(HttpStatus.FORBIDDEN, {
        message: 'Forbidden.',
      });
    }

    return next();
  };
};
