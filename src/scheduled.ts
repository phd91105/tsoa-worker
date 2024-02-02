import { PrismaClient } from '@prisma/client/edge';

import { ContextUtils } from '@/utils/context';

export const scheduled = async (
  _event: Event,
  env: Env,
  ctx: ExecutionContext
) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: env.DB_URL
      }
    }
  });

  ctx.waitUntil(ContextUtils.executeFn(prisma.$queryRaw`SELECT 1`));
};
