export enum HttpMethod {
  get = 'get',
  post = 'post',
  put = 'put',
  patch = 'patch',
  delete = 'delete',
}

export enum ResType {
  json = 'json',
  text = 'text',
  arrayBuffer = 'arrayBuffer',
  stream = 'stream',
}

export enum HttpStatus {
  SWITCHING_PROTOCOLS = 101,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  PARTIAL_CONTENT = 206,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  UNSUPPORTED_MEDIA_TYPE = 415,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}