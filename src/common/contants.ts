export const commonHeaders = (
  ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
) => ({
  'content-type': 'application/json; charset=utf-8',
  'user-agent': ua,
});

export const BEARER = 'Bearer';

export const headers = {
  accessControlAllowHeaders: 'Access-Control-Allow-Headers',
  accessControlAllowOrigin: 'Access-Control-Allow-Origin',
  accessControlAllowMethod: 'Access-Control-Allow-Methods',
  accessControlAllowCredentials: 'Access-Control-Allow-Credentials',
  accessControlExposeHeaders: 'Access-Control-Expose-Headers',
  cacheControl: 'cache-control',
  contentType: 'content-type',
  contentRange: 'content-range',
  location: 'location',
  setCookie: 'set-cookie',
};

export const contentTypes = {
  json: 'application/json',
  html: 'text/html',
  text: 'text/plain',
};
