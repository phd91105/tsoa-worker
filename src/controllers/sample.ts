import { Controller, Get, Route, Security, Tags } from '@tsoa/runtime';
import { injectable } from 'tsyringe';

import { SecurityType } from '@/middlewares/authenticate';

@Tags('Health')
@Route('/')
@injectable()
export class Sample extends Controller {
  @Get('/ping')
  ping() {
    return { message: 'pong' };
  }

  @Security(SecurityType.jwt, ['admin'])
  @Get('/secured')
  secured() {
    return { message: 'secured pong' };
  }
}
