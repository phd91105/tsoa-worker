import type { Prisma } from '@prisma/client/edge';
import { inject, injectable } from 'tsyringe';

import { PrismaClient } from '@/providers/prisma';

@injectable()
export class UserRepository {
  constructor(
    @inject(PrismaClient)
    private readonly db: PrismaClient
  ) {}

  async findById(userId: number) {
    const user = await this.db.withAccelerate.user.findUniqueOrThrow({
      where: {
        id: userId
      },
      cacheStrategy: {
        swr: 30,
        ttl: 60
      }
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.db.user.findUniqueOrThrow({
      where: {
        email
      }
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await this.db.user.create({
      data
    });

    return user;
  }

  async update(userId: number, data: Prisma.UserUpdateInput) {
    const user = await this.db.user.update({
      where: {
        id: userId
      },
      data
    });

    return user;
  }
}
