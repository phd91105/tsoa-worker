import type { MiddlewareHandler } from 'hono';
import { verify } from 'hono/jwt';
import _ from 'lodash';
import { container } from 'tsyringe';

import { Forbidden, Unauthorized } from '@/errors/exceptions';
import { Prisma } from '@/providers/prisma';

export enum SecurityType {
  jwt = 'jwt',
  oauth2 = 'oauth2',
}

type Security = {
  [key: string]: string[];
};

const BEARER_PREFIX = 'bearer ';

export const authenticationHandler = (
  security: Security[],
): MiddlewareHandler => {
  const [authProvider] = security;
  const permission = authProvider[SecurityType.jwt];

  return async (c, next) => {
    const authHeader = c.req.header('authorization');

    if (!authHeader || !authHeader.toLowerCase().startsWith(BEARER_PREFIX)) {
      throw new Unauthorized();
    }

    const bearer = authHeader.slice(BEARER_PREFIX.length);
    const payload = await verify(bearer, c.env.SECRET).catch(() => {
      throw new Unauthorized();
    });

    const db = container.resolve(Prisma);
    const user = await db.user
      .findUniqueOrThrow({
        where: {
          id: payload.uid,
        },
      })
      .catch(() => {
        throw new Unauthorized();
      });

    if (permission.length && !permission.includes(user.role)) {
      throw new Forbidden();
    }

    c.set('user', _.pick(user, ['id', 'name', 'email', 'role']));

    return next();
  };
};
