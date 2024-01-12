declare module '*.html' {
  const value: string;
  export default value;
}

declare type Env<T = string> = { [key: string]: T };
