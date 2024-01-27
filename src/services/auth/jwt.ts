import bcrypt from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { messages } from '@/constants/messages';
import { PrismaErrorCode } from '@/enums/prisma';
import { BadRequest, Unauthorized } from '@/errors/exceptions';
import type { SignIn, SignUp } from '@/interfaces/auth';
import { UserRepository } from '@/repositories/user';
import { TokenService } from '@/services/auth/token';

@injectable()
export class AuthService {
  constructor(
    @inject(TokenService) private readonly tokenService: TokenService,
    @inject(UserRepository) private readonly userRepo: UserRepository
  ) {}

  async regsiter(body: SignUp) {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await this.userRepo
      .create({
        ...body,
        password: hashedPassword
      })
      .catch((err) => {
        if (err.code === PrismaErrorCode.UniqueConstraint) {
          throw new BadRequest(messages.error.emailAlreadyExists);
        }
        throw err;
      });

    return this.tokenService.generate(user);
  }

  async login({ email, password }: SignIn) {
    const user = await this.userRepo.findByEmail(email).catch(() => {
      throw new Unauthorized(messages.error.invalidEmailOrPassword);
    });

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      throw new Unauthorized(messages.error.invalidEmailOrPassword);
    }

    return this.tokenService.generate(user);
  }
}
