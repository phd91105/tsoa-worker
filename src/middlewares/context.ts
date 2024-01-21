import 'reflect-metadata';

import type { MiddlewareHandler } from 'hono';
import { container } from 'tsyringe';

import { HonoContext } from '@/constants/injectKey';

export const provideContext = (): MiddlewareHandler => {
  return (c, next) => {
    container.register(HonoContext, {
      useValue: c,
    });

    return next();
  };
};
