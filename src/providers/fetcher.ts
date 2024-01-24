import { fetcher, type FetcherType } from 'itty-fetcher';
import { singleton } from 'tsyringe';

@singleton()
export class Fetcher {
  public apiFetcher: FetcherType;

  constructor() {
    this.apiFetcher = fetcher();
  }
}
