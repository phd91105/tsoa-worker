import { Body, Controller, NoSecurity, Post, Route, Tags } from '@tsoa/runtime';
import { inject, injectable } from 'tsyringe';

import type { SignIn, SignUp } from '@/interfaces/authenticate';
import { AuthService } from '@/services/authenticate';

@Route('auth')
@Tags('auth')
@NoSecurity()
@injectable()
export class JWTAuth extends Controller {
  constructor(
    @inject(AuthService)
    private readonly authService: AuthService,
  ) {
    super();
  }

  @Post('/register')
  signUp(@Body() user: SignUp) {
    return this.authService.regsiter(user);
  }

  @Post('/login')
  signIn(@Body() user: SignIn) {
    return this.authService.login(user);
  }
}
