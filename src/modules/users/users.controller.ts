import { Controller, Get, Path, Query, Route, Tags } from '@tsoa/runtime';

import { inject, injectable } from 'tsyringe';
import { UsersService } from './users.service';

@injectable()
@Route('users')
@Tags('users')
export class UsersController extends Controller {
  constructor(
    @inject(UsersService)
    private readonly service: UsersService,
  ) {
    super();
  }

  @Get('{userId}')
  async getUser(@Path() userId: number, @Query() name?: string) {
    return this.service.get(userId, name);
  }
}
