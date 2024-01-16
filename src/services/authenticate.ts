import { context } from '@/constants/injectKey';
import type { SignIn, SignUp } from '@/interfaces/authenticate';
import type { Context } from 'hono';
import { env } from 'hono/adapter';
import { sign } from 'hono/jwt';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AuthService {
  constructor(
    @inject(context)
    private readonly ctx: Context,
  ) {}

  async regsiter(body: SignUp) {
    return body;
  }

  async login(body: SignIn) {
    const { SECRET } = env(this.ctx);

    const user = { ...body, role: 'admin' };
    const refreshToken: string = crypto.randomUUID();
    const accessToken = await sign(user, SECRET);

    return { refreshToken, accessToken };
  }
}
