import type { Controller } from '@tsoa/runtime';
import type { Context } from 'hono';
import { fetcher } from 'itty-fetcher';
import { inject, injectable } from 'tsyringe';

import { githubOAuthUrl, githubScopes } from '@/constants';
import { HonoContext } from '@/constants/injectKeys';
import { HttpStatus } from '@/enums/http';
import { URLUtils } from '@/utils/string';

@injectable()
export class GithubOAth2Service {
  constructor(@inject(HonoContext) private readonly ctx: Context) {}

  authRedirect(ctl: Controller) {
    const authURL = URLUtils.construct(`${githubOAuthUrl}/authorize`, {
      client_id: this.ctx.env.GH_CLIENT_ID,
      scope: githubScopes
    });

    ctl.setHeader('location', authURL);
    ctl.setStatus(HttpStatus.FOUND);
  }

  getAccessToken(code: string) {
    return fetcher({ base: githubOAuthUrl }).post(
      '/access_token',
      {
        client_id: this.ctx.env.GH_CLIENT_ID,
        client_secret: this.ctx.env.GH_CLIENT_SECRET,
        code
      },
      { headers: { accept: 'application/json' } }
    );
  }
}
