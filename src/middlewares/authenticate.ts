import type { MiddlewareHandler } from 'hono';
import { verify } from 'hono/jwt';
import { container } from 'tsyringe';

import { Forbidden, Unauthorized } from '@/exceptions/http.exceptions';
import { DB } from '@/providers/db';

export enum SecurityType {
  jwt = 'jwt',
  oauth2 = 'oauth2',
}

type Security = {
  [key: string]: string[];
};

export const authenticationHandler = (
  security: Security[],
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

    const db = container.resolve(DB);
    const user = await db.user.findUnique({
      where: {
        id: payload.uid,
      },
    });

    if (permission.length && !permission.includes(user.role)) {
      throw new Forbidden();
    }

    return next();
  };
};
