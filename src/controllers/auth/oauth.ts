import {
  Controller,
  Get,
  Query,
  Route,
  SuccessResponse,
  Tags
} from '@tsoa/runtime';
import { inject, injectable } from 'tsyringe';

import { HttpStatus } from '@/enums/http';
import { GithubOAth2Service } from '@/services/auth/github';

@Tags('Auth')
@Route('/oauth')
@injectable()
export class OAuthController extends Controller {
  constructor(
    @inject(GithubOAth2Service)
    private readonly githubOAuth2Service: GithubOAth2Service
  ) {
    super();
  }

  @Get('/github')
  @SuccessResponse(HttpStatus.FOUND)
  githubAuth() {
    return this.githubOAuth2Service.authRedirect(this);
  }

  @Get('/github/callback')
  @SuccessResponse(HttpStatus.OK)
  githubCallback(@Query() code: string) {
    return this.githubOAuth2Service.getAccessToken(code);
  }
}
