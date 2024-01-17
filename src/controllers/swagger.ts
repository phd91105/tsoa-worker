import { Controller, Get, Hidden, NoSecurity, Route } from '@tsoa/runtime';
import { injectable } from 'tsyringe';

import swaggerSpec from '@/config/swagger.json';
import swaggerUI from '~/templates/swagger';

@Route('/docs')
@Hidden()
@NoSecurity()
@injectable()
export class Swagger extends Controller {
  @Get('/')
  docs() {
    this.setHeader('content-type', 'text/html');
    return swaggerUI;
  }

  @Get('/spec')
  spec() {
    return swaggerSpec;
  }
}
