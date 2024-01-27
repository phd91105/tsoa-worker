declare module '*.html' {
  const value: string;
  export default value;
}

declare type Env<T = string> = { [key: string]: T };

declare type RequestContext = Request & {
  ctx: Context<{ Bindings: Env }>;
};
