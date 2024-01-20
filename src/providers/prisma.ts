import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import type { Context } from 'hono';
import { inject, singleton } from 'tsyringe';

import { context } from '@/constants/injectKey';

@singleton()
export class Prisma extends PrismaClient {
  constructor(@inject(context) c: Context) {
    super({
      datasources: {
        db: {
          url: c.env.DB_URL,
        },
      },
      log: ['query'],
    });

    this.$extends(withAccelerate());
  }
}
