/**
 * @example {
 *  "email": "example@gmail.com",
 *  "userName": "userName",
 *  "password": "Password123"
 * }
 */
export interface SignUp {
  /**
   * @minLength 6 email must be at least 6 characters
   * @maxLength 20 email must be at most 20 characters
   * @pattern ^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$ email must be a valid email
   */
  email: string;

  /**
   * @minLength 6 userName must be at least 6 characters
   * @maxLength 20 userName must be at most 20 characters
   */
  userName: string;

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
