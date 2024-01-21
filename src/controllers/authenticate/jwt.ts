import {
  Body,
  BodyProp,
  Controller,
  Post,
  Response,
  Route,
  Tags,
} from '@tsoa/runtime';
import { inject, injectable } from 'tsyringe';

import { HttpStatus } from '@/enums/http';
import type { SignIn, SignUp } from '@/interfaces/authenticate';
import { AuthService } from '@/services/authenticate';
import { TokenService } from '@/services/token';

@Tags('Auth')
@Route('/auth')
@injectable()
export class JWTAuth extends Controller {
  constructor(
    @inject(AuthService)
    private readonly authService: AuthService,
    @inject(TokenService)
    private readonly tokenService: TokenService,
  ) {
    super();
  }

  @Post('/register')
  @Response(HttpStatus.OK)
  signUp(@Body() user: SignUp) {
    return this.authService.regsiter(user);
  }

  @Post('/login')
  @Response(HttpStatus.OK)
  signIn(@Body() user: SignIn) {
    return this.authService.login(user);
  }

  @Post('/refresh')
  @Response(HttpStatus.OK)
  refresh(@BodyProp() refreshToken: string) {
    return this.tokenService.refresh(refreshToken);
  }
}
