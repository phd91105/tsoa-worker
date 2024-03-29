import { PrismaClient as Client } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import type { Context } from 'hono';
import { inject, singleton } from 'tsyringe';

import { HonoContext } from '@/constants/injectKeys';

@singleton()
export class PrismaClient extends Client {
  constructor(@inject(HonoContext) ctx?: Context) {
    super({
      datasources: {
        db: {
          url: ctx.env.DB_URL
        }
      }
    });
  }

  get withAccelerate() {
    return this.$extends(withAccelerate());
  }
}
