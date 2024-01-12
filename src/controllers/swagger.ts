import { Controller, Get, Hidden, Route } from '@tsoa/runtime';
import swagger from '../config/swagger.json';
import { contentTypes, headers } from '../constants';
import swaggerUI from '../templates/swagger-ui.html';

@Route()
@Hidden()
export class SwaggerController extends Controller {
  @Get('/docs')
  docs() {
    this.setHeader(headers.contentType, contentTypes.html);
    return swaggerUI;
  }

  @Get('/spec')
  spec() {
    return swagger;
  }
}
