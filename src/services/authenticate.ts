import bcrypt from 'bcryptjs';
import type { Context } from 'hono';
import { sign } from 'hono/jwt';
import { inject, injectable } from 'tsyringe';

import { context } from '@/constants/injectKey';
import { BadRequest, Unauthorized } from '@/exceptions/http.exceptions';
import type { SignIn, SignUp } from '@/interfaces/authenticate';
import type { User } from '@/models/user';
import users from '~/mocks/users.json';

@injectable()
export class AuthService {
  private tokenStorage: KVNamespace;

  constructor(@inject(context) private readonly ctx: Context) {
    this.tokenStorage = this.ctx.env.token;
  }

  async regsiter(body: SignUp) {
    return body;
  }

  async login(body: SignIn) {
    const user = users.find((user) => user.email === body.email);

    if (!user) {
      throw new Unauthorized();
    }

    const isValid = await bcrypt.compare(body.password, user.password);

    if (!isValid) {
      throw new Unauthorized();
    }

    const { refreshToken, accessToken } = await this.generateToken(<User>user);

    return { refreshToken, accessToken };
  }

  async refresh(refreshToken: string) {
    let userId = null;

    try {
      userId = await this.tokenStorage.get(refreshToken);
    } catch (error) {
      userId = null;
    }

    if (!userId) {
      throw new BadRequest('Invalid refresh token');
    }

    const user = users.find((user) => user.id === Number(userId));

    if (!user) {
      throw new BadRequest('Invalid refresh token');
    }

    const { refreshToken: newRefreshToken, accessToken } =
      await this.generateToken(<User>user);

    return { refreshToken: newRefreshToken, accessToken };
  }

  private async generateToken(user: User) {
    const refreshToken: string = crypto.randomUUID();
    const accessToken = await sign(user, this.ctx.env.SECRET);

    this.ctx.executionCtx.waitUntil(
      this.tokenStorage.put(refreshToken, String(user.id), {
        expirationTtl: 60 * 60 * 24 * 1,
      }),
    );

    return { refreshToken, accessToken };
  }
}
