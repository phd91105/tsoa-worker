import type { User } from '@prisma/client/edge';
import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';
import type { Context } from 'hono';
import { sign } from 'hono/jwt';
import _ from 'lodash';
import { inject, injectable } from 'tsyringe';

import { context } from '@/constants/injectKey';
import { messages } from '@/constants/messages';
import { ResType } from '@/enums/http';
import { PrismaErrorCode } from '@/enums/prisma';
import { BadRequest, Unauthorized } from '@/errors/exceptions';
import type { SignIn, SignUp, UserPayload } from '@/interfaces/authenticate';
import { Prisma } from '@/providers/prisma';
import { execFn } from '@/utils/context';

@injectable()
export class AuthService {
  private tokenStorage: KVNamespace;

  constructor(
    @inject(context) private readonly c: Context,
    @inject(Prisma) private readonly db: Prisma,
  ) {
    this.tokenStorage = this.c.env.token;
  }

  async regsiter(body: SignUp) {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const result = await this.db.user
      .create({
        data: {
          ...body,
          password: hashedPassword,
        },
      })
      .catch((e) => {
        if (e.code === PrismaErrorCode.UniqueConstraint) {
          throw new BadRequest(messages.error.emailAlreadyExists);
        }

        throw e;
      });

    return this.generateToken(result);
  }

  async login(body: SignIn) {
    const user = await this.db.user
      .findUniqueOrThrow({
        where: {
          email: body.email,
        },
      })
      .catch(() => {
        throw new Unauthorized(messages.error.invalidEmailOrPassword);
      });

    const validPass = await bcrypt.compare(body.password, user.password);

    if (!validPass) {
      throw new Unauthorized(messages.error.invalidEmailOrPassword);
    }

    return this.generateToken(user);
  }

  async refresh(refreshToken: string) {
    const payload = await this.tokenStorage.get<UserPayload>(
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

    return this.generateToken(user);
  }

  private async generateToken(payload: User) {
    const secondSinceEpoch = dayjs().unix();

    const refreshToken: string = crypto.randomUUID();
    const accessToken = await sign(
      {
        uid: payload.id,
        iat: secondSinceEpoch,
        exp: secondSinceEpoch + 60 * 30,
      },
      this.c.env.SECRET,
    );

    this.c.executionCtx.waitUntil(
      this.tokenStorage.put(
        refreshToken,
        JSON.stringify(_.pick(payload, 'id')),
        {
          expirationTtl: 60 * 60 * 24 * 1,
        },
      ),
    );

    this.c.executionCtx.waitUntil(
      execFn(
        this.db.user.update({
          where: {
            id: payload.id,
          },
          data: {
            lastLogin: dayjs().toDate(),
          },
        }),
      ),
    );

    return { refreshToken, accessToken };
  }
}
