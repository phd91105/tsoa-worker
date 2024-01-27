import {
  Body,
  Controller,
  Get,
  Patch,
  Path,
  Response,
  Route,
  Security,
  Tags
} from '@tsoa/runtime';
import { inject, injectable } from 'tsyringe';

import { SecurityType } from '@/enums/auth';
import { HttpStatus } from '@/enums/http';
import type { UserUpdateInput } from '@/interfaces/user';
import { UserRepository } from '@/repositories/user';

@Tags('User')
@Route('/user')
@Security(SecurityType.jwt, ['admin'])
@injectable()
export class UserController extends Controller {
  constructor(
    @inject(UserRepository)
    private readonly userRepo: UserRepository
  ) {
    super();
  }

  @Get('{id}')
  @Response(HttpStatus.OK)
  findById(@Path() id: number) {
    return this.userRepo.findById(id);
  }

  @Patch('{id}')
  @Response(HttpStatus.NO_CONTENT)
  updateById(@Path() id: number, @Body() data: UserUpdateInput) {
    return this.userRepo.update(id, data);
  }
}
