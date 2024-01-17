import type { MiddlewareHandler } from 'hono';
import { verify } from 'hono/jwt';

import { Forbidden, Unauthorized } from '@/exceptions/http.exceptions';

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
      throw new Unauthorized();
    }

    const bearer = authHeader.slice(7);
    const payload = await verify(bearer, c.env.SECRET);

    if (permission.length && !permission.includes(payload.role)) {
      throw new Forbidden();
    }

    return next();
  };
};
