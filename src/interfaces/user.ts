import type { Role } from '@prisma/client/edge';

export interface UserUpdateInput {
  name?: string;
  email?: string;
  role?: Role;
}
