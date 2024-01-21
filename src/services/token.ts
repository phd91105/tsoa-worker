import type { User } from '@prisma/client/edge';
import dayjs from 'dayjs';
import type { Context } from 'hono';
import { sign } from 'hono/jwt';
import { inject, injectable } from 'tsyringe';

import { context } from '@/constants/injectKey';
import { messages } from '@/constants/messages';
import { ResType } from '@/enums/http';
import { BadRequest } from '@/errors/exceptions';
import type { UserPayload } from '@/interfaces/authenticate';
import { Prisma } from '@/providers/prisma';
import { execFn } from '@/utils/context';

@injectable()
export class TokenService {
  private refreshTokenStorage: KVNamespace;

  constructor(
    @inject(context) private readonly c: Context,
    @inject(Prisma) private readonly db: Prisma,
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
        this.db.user.update({
          where: {
            id: user.id,
          },
          data: {
            lastLogin: dayjs().toDate(),
          },
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

    const user = await this.db.user
      .findUniqueOrThrow({
        where: {
          id: payload.id,
        },
      })
      .catch(() => {
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
