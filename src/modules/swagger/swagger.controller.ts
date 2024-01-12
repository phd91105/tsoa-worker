import { Controller, Get, Hidden, Route } from '@tsoa/runtime';
import { contentTypes, headers } from 'common/contants';
import swaggerUi from './swagger-ui.html';
import swagger from './swagger.json';

@Route()
@Hidden()
export class SwaggerController extends Controller {
  @Get('/docs')
  docs() {
    this.setHeader(headers.contentType, contentTypes.html);
    return swaggerUi;
  }

  @Get('/spec')
  spec() {
    return swagger;
  }
}
