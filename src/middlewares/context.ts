import { context } from '@/constants/injectKey';
import type { MiddlewareHandler } from 'hono';
import 'reflect-metadata';
import { container } from 'tsyringe';

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
