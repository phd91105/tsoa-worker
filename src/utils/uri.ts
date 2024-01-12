export class URIUtils {
  static constructURLWithParams(
    baseUrl: string,
    params: { [key: string]: string | number },
  ) {
    const url = new URL(baseUrl);
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        url.searchParams.set(key, String(params[key]));
      }
    });
    return url.toString();
  }
}
