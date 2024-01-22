import dayjs from 'dayjs';
import type { MiddlewareHandler } from 'hono';
import { verify } from 'hono/jwt';
import { container } from 'tsyringe';

import { messages } from '@/constants/messages';
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

    // Verify token
    const payload = await verify(bearer, c.env.SECRET).catch(() => {
      throw new Unauthorized(messages.error.invalidToken);
    });

    if (payload.exp < dayjs().unix()) {
      throw new Forbidden(messages.error.tokenExpired);
    }

    const db = container.resolve(Prisma);
    const user = await db.user
      .findUniqueOrThrow({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
        where: {
          id: payload.uid,
        },
      })
      .catch(() => {
        throw new Unauthorized();
      });

    // Check permission
    if (permission.length && !permission.includes(user.role)) {
      throw new Forbidden(messages.error.permissionDenied);
    }

    c.set('user', user);
    return next();
  };
};
