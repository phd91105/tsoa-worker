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
import { GithubOAuthService } from '@/services/github.oauth';

@Tags('Auth')
@Route('/oauth')
@injectable()
export class OAuthController extends Controller {
  constructor(
    @inject(GithubOAuthService)
    private readonly githubOAuthService: GithubOAuthService,
  ) {
    super();
  }

  @Get('/github')
  @SuccessResponse(HttpStatus.FOUND, 'Redirect')
  githubAuth() {
    return this.githubOAuthService.authRedirect(this);
  }

  @Get('/github/callback')
  @SuccessResponse(HttpStatus.OK)
  githubCallback(@Query() code: string) {
    return this.githubOAuthService.getAccessToken(code);
  }
}
