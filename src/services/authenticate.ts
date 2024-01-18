import { Role, type User } from '@prisma/client/edge';
import bcrypt from 'bcryptjs';
import type { Context } from 'hono';
import { sign } from 'hono/jwt';
import { inject, injectable } from 'tsyringe';

import { context } from '@/constants/injectKey';
import { BadRequest, Unauthorized } from '@/exceptions/http.exceptions';
import type { SignIn, SignUp } from '@/interfaces/authenticate';
import { DB } from '@/providers/db';

@injectable()
export class AuthService {
  private tokenStorage: KVNamespace;

  constructor(
    @inject(context) private readonly c: Context,
    @inject(DB) private readonly db: DB,
  ) {
    this.tokenStorage = this.c.env.token;
  }

  async regsiter(body: SignUp) {
    const userExists = await this.db.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (userExists) {
      throw new BadRequest('Email already exists.');
    }

    const hashedPassword = await bcrypt.hash(body.password, 2);

    const user = {
      name: body.userName,
      email: body.email,
      role: Role.user,
      password: hashedPassword,
    };

    const result = await this.db.user.create({
      data: user,
    });

    return this.generateToken(result);
  }

  async login(body: SignIn) {
    const user = await this.db.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      throw new Unauthorized();
    }

    const isValid = await bcrypt.compare(body.password, user.password);

    if (!isValid) {
      throw new Unauthorized();
    }

    return this.generateToken(user);
  }

  async refresh(refreshToken: string) {
    const userId = await this.tokenStorage.get(refreshToken);

    if (!userId) {
      throw new BadRequest('Invalid token.');
    }

    const user = await this.db.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      throw new BadRequest('Invalid token.');
    }

    return this.generateToken(user);
  }

  private async generateToken(payload: Pick<User, 'id'>) {
    const secondSinceEpoch = Math.floor(new Date().getTime() / 1000);

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
      this.tokenStorage.put(refreshToken, String(payload.id), {
        expirationTtl: 60 * 60 * 24 * 1,
      }),
    );

    return { refreshToken, accessToken };
  }
}
