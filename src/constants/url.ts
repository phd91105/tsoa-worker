export const GH_OAUTH_BASE_URL = 'https://github.com/login/oauth';
export const GH_SCOPES = 'read:org,read:user';

export const githubUrl = (owner: string, repo: string) =>
  `https://api.github.com/repos/${owner}/${repo}/commits`;

export const commonHeaders = () => ({
  'content-type': 'application/json; charset=utf-8',
  'user-agent': 'hono',
});
