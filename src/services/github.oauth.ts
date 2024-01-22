import type { Controller } from '@tsoa/runtime';
import type { Context } from 'hono';
import { fetcher } from 'itty-fetcher';
import { inject, injectable } from 'tsyringe';

import { HonoContext } from '@/constants/injectKey';
import { GH_OAUTH_BASE_URL, GH_SCOPES } from '@/constants/url';
import { HttpStatus } from '@/enums/http';

@injectable()
export class GithubOAuthService {
  constructor(@inject(HonoContext) private readonly c: Context) {}

  authRedirect(controller: Controller) {
    const authURL = `${GH_OAUTH_BASE_URL}/authorize?client_id=${this.c.env.GH_CLIENT_ID}&scope=${GH_SCOPES}`;

    controller.setHeader('location', authURL);
    controller.setStatus(HttpStatus.FOUND);

    return 'Redirect';
  }

  async getAccessToken(code: string) {
    const api = fetcher({ base: GH_OAUTH_BASE_URL });

    const data = await api.post(
      '/access_token',
      {
        client_id: this.c.env.GH_CLIENT_ID,
        client_secret: this.c.env.GH_CLIENT_SECRET,
        code,
      },
      { headers: { accept: 'application/json' } },
    );

    return data;
  }
}
