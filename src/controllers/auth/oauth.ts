import {
  Controller,
  Get,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from '@tsoa/runtime';
import { inject, injectable } from 'tsyringe';

import { HttpStatus } from '@/enums/http';
import { GithubOath2Service } from '@/services/auth/github';

@Tags('Auth')
@Route('/oauth')
@injectable()
export class OAuthController extends Controller {
  constructor(
    @inject(GithubOath2Service)
    private readonly githubOAuth2Service: GithubOath2Service,
  ) {
    super();
  }

  @Get('/github')
  @SuccessResponse(HttpStatus.FOUND, 'Redirect')
  githubAuth() {
    return this.githubOAuth2Service.authRedirect(this);
  }

  @Get('/github/callback')
  @SuccessResponse(HttpStatus.OK)
  githubCallback(@Query() code: string) {
    return this.githubOAuth2Service.getAccessToken(code);
  }
}
