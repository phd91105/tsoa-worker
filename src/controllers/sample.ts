import { Controller, Get, Route } from '@tsoa/runtime';
import { injectable } from 'tsyringe';

@Route('/ping')
@injectable()
export class Sample extends Controller {
  @Get('/')
  ping() {
    return { message: 'pong' };
  }
}
