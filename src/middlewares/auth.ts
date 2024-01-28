import type { MiddlewareHandler } from 'hono';
import { verify } from 'hono/jwt';
import {
  first,
  includes,
  indexOf,
  isEmpty,
  isNil,
  keys,
  lowerCase,
  map,
  omit,
  startsWith
} from 'lodash';

import { bearerPrefix } from '@/constants';
import { messages } from '@/constants/messages';
import { SecurityType } from '@/enums/auth';
import { Forbidden, Unauthorized } from '@/errors/exceptions';
import type { Security } from '@/interfaces/auth';
import { iocContainer } from '@/ioc';
import { UserRepository } from '@/repositories/user';

const extractToken = (authHeader: string) => {
  if (isNil(authHeader) || !startsWith(lowerCase(authHeader), bearerPrefix)) {
    throw new Unauthorized();
  }

  return authHeader.substring(bearerPrefix.length);
};

// Main authentication handler
export const authenticationHandler = (
  security: Security[]
): MiddlewareHandler => {
  const authProviders = map(security, (s) => first(keys(s)));

  return async (c, next) => {
    if (includes(authProviders, SecurityType.githubToken)) {
      return next();
    }

    const jwtProviderIdx = indexOf(authProviders, SecurityType.jwt);
    const permission = security[jwtProviderIdx][SecurityType.jwt];

    if (includes(authProviders, SecurityType.jwt)) {
      const bearerToken = extractToken(c.req.header('authorization'));

      const payload = await verify(bearerToken, c.env.SECRET).catch(() => {
        throw new Unauthorized(messages.error.invalidToken);
      });

      const userRepo = iocContainer.get(UserRepository);
      const user = await userRepo.findById(payload.uid).catch(() => {
        throw new Unauthorized();
      });

      if (!isEmpty(permission) && !includes(permission, user.role)) {
        throw new Forbidden(messages.error.permissionDenied);
      }

      c.set('user', omit(user, 'password'));
    }

    return next();
  };
};
