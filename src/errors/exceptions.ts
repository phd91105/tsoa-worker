import { HTTPException } from 'hono/http-exception';

import { HttpStatus } from '@/enums/http';

export class NotFound extends HTTPException {
  constructor(message = 'Not found.') {
    super(HttpStatus.NOT_FOUND, { message });
  }
}

export class BadRequest extends HTTPException {
  constructor(message = 'Bad Request.') {
    super(HttpStatus.BAD_REQUEST, { message });
  }
}

export class Unauthorized extends HTTPException {
  constructor(message = 'Unauthorized.') {
    super(HttpStatus.UNAUTHORIZED, { message });
  }
}

export class Forbidden extends HTTPException {
  constructor(message = 'Forbidden.') {
    super(HttpStatus.FORBIDDEN, { message });
  }
}

export class InternalServerError extends HTTPException {
  constructor(message = 'Internal Server Error.') {
    super(HttpStatus.INTERNAL_SERVER_ERROR, { message });
  }
}
