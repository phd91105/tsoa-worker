import dayjs from 'dayjs';
import type { MiddlewareHandler } from 'hono';
import { verify } from 'hono/jwt';
import _ from 'lodash';
import { container } from 'tsyringe';

import { bearerPrefix } from '@/constants';
import { messages } from '@/constants/messages';
import { SecurityType } from '@/enums/auth';
import { Forbidden, Unauthorized } from '@/errors/exceptions';
import type { Security } from '@/interfaces/auth';
import { UserRepository } from '@/repositories/user';

const extractToken = (authHeader: string) => {
  if (
    _.isNil(authHeader) ||
    !_.startsWith(_.lowerCase(authHeader), bearerPrefix)
  ) {
    throw new Unauthorized();
  }

  return authHeader.substring(bearerPrefix.length);
};

const verifyToken = async (token: string, secret: string) => {
  const payload = await verify(token, secret).catch(() => {
    throw new Unauthorized(messages.error.invalidToken);
  });

  if (payload.exp < dayjs().unix()) {
    throw new Forbidden(messages.error.tokenExpired);
  }

  return payload;
};

// Main authentication handler
export const authenticationHandler = (
  security: Security[],
): MiddlewareHandler => {
  const authProviders = _.map(security, (s) => _.first(_.keys(s)));

  return async (c, next) => {
    if (_.includes(authProviders, SecurityType.githubToken)) {
      return next();
    }

    const jwtProviderIdx = _.indexOf(authProviders, SecurityType.jwt);
    const permission = security[jwtProviderIdx][SecurityType.jwt];

    if (_.includes(authProviders, SecurityType.jwt)) {
      const bearerToken = extractToken(c.req.header('authorization'));

      const payload = await verifyToken(bearerToken, c.env.SECRET);

      const userRepo = container.resolve(UserRepository);
      const user = await userRepo.findById(payload.uid).catch(() => {
        throw new Unauthorized();
      });

      if (!_.isEmpty(permission) && !_.includes(permission, user.role)) {
        throw new Forbidden(messages.error.permissionDenied);
      }

      c.set('user', _.omit(user, 'password'));
    }

    return next();
  };
};
