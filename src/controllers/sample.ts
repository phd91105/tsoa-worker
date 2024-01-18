import {
  Controller,
  Post,
  Route,
  Security,
  Tags,
  UploadedFile,
} from '@tsoa/runtime';
import type { Context } from 'hono';
import { inject, injectable } from 'tsyringe';

import { context } from '@/constants/injectKey';
import { SecurityType } from '@/middlewares/authenticate';

@Route('sample')
@Tags('sample')
@injectable()
export class Sample extends Controller {
  private storage: KVNamespace;

  constructor(@inject(context) private readonly c: Context) {
    super();
    this.storage = this.c.env.storage;
  }

  @Security(SecurityType.jwt, ['admin'])
  @Post('/upload')
  async uploadFile(
    /**
     * @required File is required.
     */
    @UploadedFile('file') file: File,
  ) {
    const arrbuf = await file.arrayBuffer();
    this.c.executionCtx.waitUntil(this.storage.put(file.name, arrbuf));

    return { file: file.name };
  }
}
