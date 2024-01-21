import { Controller, Get, Route, Tags } from '@tsoa/runtime';
import { injectable } from 'tsyringe';

@Tags('Health')
@Route('/')
@injectable()
export class Health extends Controller {
  @Get('/ping')
  ping() {
    return { message: 'pong' };
  }
}
