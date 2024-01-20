export const execFn = (promise: Promise<unknown>) => {
  return (async () => await promise)();
};
