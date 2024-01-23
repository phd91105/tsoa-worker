import type { User } from '@prisma/client/edge';
import dayjs from 'dayjs';
import type { Context } from 'hono';
import { sign } from 'hono/jwt';
import { inject, injectable } from 'tsyringe';

import { HonoContext } from '@/constants/inject.keys';
import { messages } from '@/constants/messages';
import { ResType } from '@/enums/http';
import { BadRequest } from '@/errors/exceptions';
import type { UserPayload } from '@/interfaces/auth';
import { UserRepository } from '@/repositories/user';
import { execFn } from '@/utils/context';

@injectable()
export class TokenService {
  private refreshTokenStorage: KVNamespace;

  constructor(
    @inject(HonoContext) private readonly c: Context,
    @inject(UserRepository) private readonly userRepo: UserRepository,
  ) {
    this.refreshTokenStorage = this.c.env.token;
  }

  async generate(user: User) {
    const secondSinceEpoch = dayjs().unix();

    const refreshToken: string = crypto.randomUUID();
    const accessToken = await sign(
      {
        uid: user.id,
        iat: secondSinceEpoch,
        exp: secondSinceEpoch + 60 * 30,
      },
      this.c.env.SECRET,
    );

    this.c.executionCtx.waitUntil(
      this.refreshTokenStorage.put(
        refreshToken,
        JSON.stringify({ id: user.id }),
        {
          expirationTtl: 60 * 60 * 24 * 1,
        },
      ),
    );

    this.c.executionCtx.waitUntil(
      execFn(
        this.userRepo.update(user.id, {
          lastLogin: dayjs().toDate(),
        }),
      ),
    );

    return { refreshToken, accessToken };
  }

  async refresh(refreshToken: string) {
    const payload = await this.refreshTokenStorage.get<UserPayload>(
      refreshToken,
      ResType.json,
    );

    if (!payload) {
      throw new BadRequest(messages.error.invalidRefreshToken);
    }

    const user = await this.userRepo.findById(payload.id).catch(() => {
      throw new BadRequest(messages.error.invalidRefreshToken);
    });

    return this.generate(user);
  }

  revoke(refreshToken: string) {
    this.c.executionCtx.waitUntil(
      this.refreshTokenStorage.delete(refreshToken),
    );
  }
}
