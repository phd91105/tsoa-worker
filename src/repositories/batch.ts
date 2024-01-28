import type { Prisma } from '@prisma/client/edge';
import type { Context } from 'hono';
import { inject, injectable } from 'tsyringe';

import { HonoContext } from '@/constants/inject.keys';
import { PrismaClient } from '@/providers/prisma';

@injectable()
export class BatchRepository {
  constructor(
    @inject(PrismaClient) private readonly db: PrismaClient,
    @inject(HonoContext) private readonly ctx: Context
  ) {}

  async findAll() {
    const allBatch = await this.db.batchStatus.findMany({
      where: {
        createdById: this.ctx.get('user').id
      },
      orderBy: {
        id: 'desc'
      }
    });

    return allBatch;
  }

  async create(data: Prisma.BatchStatusCreateInput) {
    const user = this.ctx.get('user');

    const batch = await this.db.batchStatus.create({
      data: {
        ...data,
        createdById: user.id,
        updatedById: user.id
      }
    });

    return batch;
  }

  async update(id: number, data: Prisma.BatchStatusUpdateInput) {
    const batch = await this.db.batchStatus.update({
      where: {
        id
      },
      data: {
        ...data,
        updatedById: this.ctx.get('user').id
      }
    });

    return batch;
  }
}
