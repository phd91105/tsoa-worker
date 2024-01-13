import type { Context, Next } from 'hono';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { context } from '../constants';

export async function provideContext(c: Context, next: Next) {
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

  await next();
}
