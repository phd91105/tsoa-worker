import { singleton } from 'tsyringe';

import { HttpMethod, ResType } from '@/enums/http';

@singleton()
export class FetchAdapter {
  private async request<T>(
    url: string,
    options: RequestInit = {},
    resType: ResType = ResType.json,
  ): Promise<T> {
    const response = await fetch(url, options);
    return response[resType]() as Promise<T>;
  }

  private mergeOptions(
    body: BodyInit,
    options: RequestInit,
    method: string,
  ): RequestInit {
    const isJSON = typeof body === 'object' && body !== null;
    const headers = isJSON
      ? { 'Content-Type': 'application/json', ...options.headers }
      : options.headers;

    return {
      ...options,
      method,
      body: isJSON ? JSON.stringify(body) : body,
      headers,
    };
  }

  get<T>(
    url: string,
    options: RequestInit = {},
    resType: ResType = ResType.json,
  ): Promise<T> {
    return this.request<T>(
      url,
      { ...options, method: HttpMethod.get },
      resType,
    );
  }

  post<T>(url: string, body: BodyInit, options: RequestInit = {}): Promise<T> {
    return this.request<T>(
      url,
      this.mergeOptions(body, options, HttpMethod.post),
    );
  }

  put<T>(url: string, body: BodyInit, options: RequestInit = {}): Promise<T> {
    return this.request<T>(
      url,
      this.mergeOptions(body, options, HttpMethod.put),
    );
  }

  patch<T>(url: string, body: BodyInit, options: RequestInit = {}): Promise<T> {
    return this.request<T>(
      url,
      this.mergeOptions(body, options, HttpMethod.patch),
    );
  }

  delete<T>(url: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: HttpMethod.delete });
  }
}
