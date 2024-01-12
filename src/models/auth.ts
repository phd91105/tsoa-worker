export class SignUpDto {
  email: string;
  userName: string;
  password: string;
}

export class SignInDto {
  email?: string;
  userName?: string;
  password: string;
}
