import {
  Body,
  BodyProp,
  Controller,
  Get,
  Post,
  Response,
  Route,
  Security,
  Tags,
} from '@tsoa/runtime';
import type { Context } from 'hono';
import { inject, injectable } from 'tsyringe';

import { HonoContext } from '@/constants/injectKey';
import { HttpStatus } from '@/enums/http';
import type { SignIn, SignUp } from '@/interfaces/authenticate';
import { SecurityType } from '@/middlewares/authenticate';
import { AuthService } from '@/services/authenticate';
import { TokenService } from '@/services/token';

@Tags('Auth')
@Route('/user')
@injectable()
export class JWTAuth extends Controller {
  constructor(
    @inject(HonoContext)
    private readonly c: Context,
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

  @Get('/me')
  @Security(SecurityType.jwt)
  @Response(HttpStatus.OK)
  profile() {
    return this.c.get('user');
  }
}
