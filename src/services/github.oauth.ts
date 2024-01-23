import type { Controller } from '@tsoa/runtime';
import type { Context } from 'hono';
import { fetcher } from 'itty-fetcher';
import { inject, injectable } from 'tsyringe';

import { HonoContext } from '@/constants/inject.keys';
import { GH_OAUTH_BASE_URL, GH_SCOPES } from '@/constants/url';
import { HttpStatus } from '@/enums/http';
import { URLUtils } from '@/utils/string';

@injectable()
export class GithubService {
  constructor(@inject(HonoContext) private readonly c: Context) {}

  authRedirect(ctl: Controller) {
    const authURL = URLUtils.construct(GH_OAUTH_BASE_URL + '/authorize', {
      client_id: this.c.env.GH_CLIENT_ID,
      scope: GH_SCOPES,
    });

    ctl.setHeader('location', authURL);
    ctl.setStatus(HttpStatus.FOUND);

    return 'Redirect';
  }

  getAccessToken(code: string) {
    const api = fetcher({ base: GH_OAUTH_BASE_URL });

    return api.post(
      '/access_token',
      {
        client_id: this.c.env.GH_CLIENT_ID,
        client_secret: this.c.env.GH_CLIENT_SECRET,
        code,
      },
      { headers: { accept: 'application/json' } },
    );
  }
}
