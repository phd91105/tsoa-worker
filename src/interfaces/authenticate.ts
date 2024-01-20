import type { User } from '@prisma/client/edge';

/**
 * @example {
 *  "email": "example@gmail.com",
 *  "name": "example",
 *  "password": "Password123"
 * }
 */
export interface SignUp {
  /**
   * @minLength 6 email must be at least 6 characters
   * @maxLength 100 email must be at most 100 characters
   * @pattern ^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$ email must be a valid email
   */
  email: string;

  /**
   * @minLength 3 name must be at least 3 characters
   * @maxLength 20 name must be at most 20 characters
   */
  name?: string;

  /**
   * @minLength 8 password must be at least 8 characters
   * @maxLength 16 password must be at most 16 characters
   * @pattern ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$ password must contain at least one uppercase letter, one lowercase letter and one number
   */
  password: string;
}

/**
 * @example {
 *  "email": "example@gmail.com",
 *  "password": "Password123"
 * }
 */
export interface SignIn {
  /**
   * @pattern ^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$ email must be a valid email
   */
  email: string;

  /**
   * @minLength 8 password must be at least 8 characters
   * @maxLength 16 password must be at most 16 characters
   * @pattern ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$ password must contain at least one uppercase letter, one lowercase letter and one number
   */
  password: string;
}

/**
 * @example {
 *  "refreshToken": "3d47c1ec-d933-4d30-a87d-7b4181c51d79"
 * }
 */
export interface RefreshToken {
  /**
   * @minLength 1 refreshToken is required
   */
  refreshToken: string;
}

export type UserPayload = Pick<User, 'id'>;
