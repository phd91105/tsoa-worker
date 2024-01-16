import type { MiddlewareHandler } from 'hono';

export const handleFileUpload = (): MiddlewareHandler => {
  return async (c, next) => {
    const contentType = c.req.raw.headers.get('content-type');
    if (!contentType?.includes('multipart/form-data')) {
      return next();
    }
    const body = await c.req.parseBody();
    c['files'] = [
      ...Object.values(body).filter((item) => item instanceof Blob),
    ] as File[];

    return next();
  };
};
