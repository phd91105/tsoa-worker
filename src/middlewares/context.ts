import 'reflect-metadata';

import type { MiddlewareHandler } from 'hono';
import { env } from 'hono/adapter';
import { container } from 'tsyringe';

import { context } from '@/constants/injectKey';

export const provideContext = (): MiddlewareHandler => {
  return (c, next) => {
    container.register(context, {
      useValue: {
        executor: () => c.executionCtx,
        get env() {
          return env(c);
        },
        get executionCtx() {
          return this.executor();
        },
      },
    });

    return next();
  };
};
