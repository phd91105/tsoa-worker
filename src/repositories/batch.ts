import type { Prisma as PrismaType } from '@prisma/client/edge';
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
    return this.db.batchStatus.findMany({
      where: {
        createdById: this.ctx.get('user').id
      },
      orderBy: {
        id: 'desc'
      }
    });
  }

  async create(data: PrismaType.BatchStatusCreateInput) {
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

  async update(id: number, data: PrismaType.BatchStatusUpdateInput) {
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
