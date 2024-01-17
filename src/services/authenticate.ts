import bcrypt from 'bcryptjs';
import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { sign } from 'hono/jwt';
import { inject, injectable } from 'tsyringe';

import { context } from '@/constants/injectKey';
import { HttpStatus } from '@/enums/httpStatus';
import type { SignIn, SignUp } from '@/interfaces/authenticate';
import { Role } from '@/models/user';
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
      throw new HTTPException(HttpStatus.UNAUTHORIZED, {
        message: 'Unauthorized.',
      });
    }

    const isValid = await bcrypt.compare(body.password, user.password);

    if (!isValid) {
      throw new HTTPException(HttpStatus.UNAUTHORIZED, {
        message: 'Unauthorized.',
      });
    }

    const refreshToken: string = crypto.randomUUID();
    const accessToken = await sign(user, this.ctx.env.SECRET);

    this.ctx.executionCtx.waitUntil(
      this.tokenStorage.put(refreshToken, String(user.id), {
        expirationTtl: 60 * 60 * 24 * 1, // 1 day
      }),
    );

    return { refreshToken, accessToken };
  }

  async refresh(refreshToken: string) {
    const userId = await this.tokenStorage.get(refreshToken);
    if (!userId) {
      throw new Error('Invalid refresh token');
    }

    const user = { role: Role.admin, id: 1 };
    const accessToken = await sign(user, this.ctx.env.SECRET);

    return { accessToken };
  }
}
