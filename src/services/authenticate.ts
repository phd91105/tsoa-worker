import bcrypt from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { messages } from '@/constants/messages';
import { PrismaErrorCode } from '@/enums/prisma';
import { BadRequest, Unauthorized } from '@/errors/exceptions';
import type { SignIn, SignUp } from '@/interfaces/authenticate';
import { Prisma } from '@/providers/prisma';
import { TokenService } from '@/services/token';

@injectable()
export class AuthService {
  constructor(
    @inject(Prisma) private readonly db: Prisma,
    @inject(TokenService) private readonly tokenService: TokenService,
  ) {}

  async regsiter(body: SignUp) {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await this.db.user
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

    return this.tokenService.generate(user);
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

    return this.tokenService.generate(user);
  }
}
