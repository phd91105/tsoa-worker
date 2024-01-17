export enum Role {
  admin = 'admin',
  user = 'user',
}

export class User {
  id: number;
  name: string;
  password: string;
  role: Role;
  email: string;
}
