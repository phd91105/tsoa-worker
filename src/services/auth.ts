import { singleton } from 'tsyringe';
import type { SignInDto, SignUpDto } from '../models/auth';

@singleton()
export class AuthService {
  async regsiter(body: SignUpDto) {
    return body;
  }

  async login(body: SignInDto) {
    return body;
  }
}
