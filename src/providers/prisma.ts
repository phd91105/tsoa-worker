import { PrismaClient as Client } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import type { Context } from 'hono';
import { inject, singleton } from 'tsyringe';

import { HonoContext } from '@/constants/inject.keys';

@singleton()
export class PrismaClient extends Client {
  constructor(@inject(HonoContext) c: Context) {
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
