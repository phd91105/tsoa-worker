import {
  Body,
  BodyProp,
  Controller,
  Get,
  Post,
  Request,
  Response,
  Route,
  Security,
  Tags,
} from '@tsoa/runtime';
import { inject, injectable } from 'tsyringe';

import { HttpStatus } from '@/enums/http';
import type { SignIn, SignUp } from '@/interfaces/auth';
import { SecurityType } from '@/middlewares/auth';
import { AuthService } from '@/services/auth';
import { TokenService } from '@/services/token';

@Tags('Auth')
@Route('/auth')
@injectable()
export class AuthController extends Controller {
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

  @Post('/refreshToken')
  @Response(HttpStatus.OK)
  refresh(@BodyProp() refreshToken: string) {
    return this.tokenService.refresh(refreshToken);
  }

  @Get('/profile')
  @Security(SecurityType.jwt)
  @Response(HttpStatus.OK)
  profile(@Request() request: ReqCtx) {
    return request.ctx.get('user');
  }
}
