export const bearerPrefix = 'bearer ';

export const githubScopes = 'read:org,read:user';
export const githubOAuthUrl = 'https://github.com/login/oauth';

export const githubUrl = (owner: string, repo: string) =>
  `https://api.github.com/repos/${owner}/${repo}/commits`;

export const commonHeaders = {
  'content-type': 'application/json; charset=utf-8',
  'user-agent': 'hono',
};
