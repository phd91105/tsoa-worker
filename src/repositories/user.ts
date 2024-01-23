import type { Prisma as PrismaType } from '@prisma/client/edge';
import { inject, injectable } from 'tsyringe';

import { PrismaClient } from '@/providers/prisma';

@injectable()
export class UserRepository {
  constructor(
    @inject(PrismaClient)
    private readonly db: PrismaClient,
  ) {}

  async findById(userId: number) {
    const user = await this.db.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = this.db.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: PrismaType.UserCreateInput) {
    const user = await this.db.user.create({
      data,
    });

    return user;
  }

  async update(userId: number, data: PrismaType.UserUpdateInput) {
    const user = await this.db.user.update({
      where: {
        id: userId,
      },
      data,
    });

    return user;
  }
}
