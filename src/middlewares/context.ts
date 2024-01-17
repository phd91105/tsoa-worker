import 'reflect-metadata';

import type { MiddlewareHandler } from 'hono';
import { container } from 'tsyringe';

import { context } from '@/constants/injectKey';

export const provideContext = (): MiddlewareHandler => {
  return (c, next) => {
    container.register(context, {
      useValue: {
        environment: () => c.env,
        executor: () => c.executionCtx,
        get env() {
          return this.environment();
        },
        get executionCtx() {
          return this.executor();
        },
      },
    });

    return next();
  };
};
