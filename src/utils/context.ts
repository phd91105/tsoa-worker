export class ContextUtils {
  static executeFn(promise: Promise<unknown>) {
    return (async () => await promise)();
  }
}
