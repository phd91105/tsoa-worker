import { context } from '@/constants/injectKey';
import type { SignIn, SignUp } from '@/interfaces/authenticate';
import { Role } from '@/models/user';
import type { Context } from 'hono';
import { sign } from 'hono/jwt';
import { inject, injectable } from 'tsyringe';

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
    const user = { role: Role.admin, id: 1, ...body };

    const refreshToken: string = crypto.randomUUID();
    const accessToken = await sign(user, this.ctx.env.SECRET);

    this.ctx.executionCtx.waitUntil(
      this.tokenStorage.put(refreshToken, String(user.id), {
        expirationTtl: 60 * 60 * 24 * 1, // 1 day
      }),
    );

    return { refreshToken, accessToken };
  }
}
