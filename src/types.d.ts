declare module '*.html' {
  const value: string;
  export default value;
}

declare type Env<T = string> = { [key: string]: T };

declare type ReqCtx = Request & {
  ctx: Context<{ Bindings: Env }>;
};
