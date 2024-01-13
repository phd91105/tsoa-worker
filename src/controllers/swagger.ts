import { Controller, Get, Hidden, Route } from '@tsoa/runtime';
import swagger from '../config/swagger.json';
import swaggerUI from '../templates/swagger.html';

@Route()
@Hidden()
export class SwaggerController extends Controller {
  @Get('/docs')
  docs() {
    this.setHeader('content-type', 'text/html');
    return swaggerUI;
  }

  @Get('/spec')
  spec() {
    return swagger;
  }
}
