import {
  Body,
  BodyProp,
  Controller,
  Get,
  Post,
  Route,
  Security,
  SuccessResponse,
  Tags
} from '@tsoa/runtime';
import type { Context } from 'hono';
import { inject, injectable } from 'tsyringe';

import { HonoContext } from '@/constants/inject.keys';
import { SecurityType } from '@/enums/auth';
import { HttpStatus } from '@/enums/http';
import type { SignIn, SignUp } from '@/interfaces/auth';
import { AuthService } from '@/services/auth/jwt';
import { TokenService } from '@/services/auth/token';

@Tags('Auth')
@Route('/auth')
@injectable()
export class AuthController extends Controller {
  constructor(
    @inject(AuthService)
    private readonly authService: AuthService,
    @inject(TokenService)
    private readonly tokenService: TokenService,
    @inject(HonoContext)
    private readonly ctx: Context
  ) {
    super();
  }

  @Post('/register')
  @SuccessResponse(HttpStatus.OK)
  signUp(@Body() user: SignUp) {
    return this.authService.regsiter(user);
  }

  @Post('/login')
  @SuccessResponse(HttpStatus.OK)
  signIn(@Body() user: SignIn) {
    return this.authService.login(user);
  }

  @Post('/refreshToken')
  @SuccessResponse(HttpStatus.OK)
  refresh(@BodyProp() refreshToken: string) {
    return this.tokenService.refresh(refreshToken);
  }

  @Get('/profile')
  @Security(SecurityType.jwt)
  @SuccessResponse(HttpStatus.OK)
  profile() {
    return this.ctx.get('user');
  }
}
