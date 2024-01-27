export const bearerPrefix = 'bearer ';

export const githubScopes = 'read:org,read:user';
export const githubOAuthUrl = 'https://github.com/login/oauth';

const githubApiUrl = 'https://api.github.com';

export const getRepoCommitUrl = (owner: string, repo: string) =>
  `${githubApiUrl}/repos/${owner}/${repo}/commits`;

export const triggerWorkflowUrl = (repo: string, workflowId: string) =>
  `${githubApiUrl}/repos/${repo}/actions/workflows/${workflowId}/dispatches`;

export const commonHeaders = {
  accept: 'application/vnd.github+json',
  'content-type': 'application/json; charset=utf-8',
  'user-agent': 'hono'
};
