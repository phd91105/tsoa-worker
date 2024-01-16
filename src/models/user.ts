export enum Role {
  admin = 'admin',
  user = 'user',
}

export class User {
  id: number;
  username: string;
  password: string;
  role: Role;
}
