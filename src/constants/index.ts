export const bearerPrefix = 'bearer ';

export const githubScopes = 'read:org,read:user';
export const githubOAuthUrl = 'https://github.com/login/oauth';

export const githubApiUrl = 'https://api.github.com';

export const getCommitPath = (owner: string, repo: string) =>
  `/repos/${owner}/${repo}/commits`;

export const triggerWorkflowPath = (repo: string, workflowId: string) =>
  `/repos/${repo}/actions/workflows/${workflowId}/dispatches`;

export const commonHeaders = {
  accept: 'application/vnd.github+json',
  'content-type': 'application/json; charset=utf-8',
  'user-agent': 'hono'
};
