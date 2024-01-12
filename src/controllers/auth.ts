import { Body, Controller, Post, Route, Tags } from '@tsoa/runtime';

import { inject, injectable } from 'tsyringe';

import type { SignInDto, SignUpDto } from '../models/auth';
import { AuthService } from '../services/auth';

@Route('/v1/api')
@Tags('Auth')
@injectable()
export class AuthController extends Controller {
  constructor(@inject(AuthService) private service: AuthService) {
    super();
  }

  @Post('/register')
  signUp(@Body() user: SignUpDto) {
    return this.service.regsiter(user);
  }

  @Post('/login')
  signIn(@Body() user: SignInDto) {
    return this.service.login(user);
  }
}
