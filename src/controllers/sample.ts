import { SecurityType } from '@/middlewares/authenticate';
import {
  Controller,
  Post,
  Request,
  Route,
  Security,
  Tags,
  UploadedFile,
} from '@tsoa/runtime';
import { injectable } from 'tsyringe';

@Route('sample')
@Tags('sample')
@injectable()
export class Sample extends Controller {
  /**
   * This is a sample route.
   */
  @Security(SecurityType.jwt)
  @Post('/upload')
  async uploadFile(
    @Request() req: ReqCtx,
    /**
     * @required File is required.
     */
    @UploadedFile('file')
    file: File,
  ) {
    const arrbuf = await file.arrayBuffer();
    console.log(arrbuf);
    // this.ctx.env.storage.put(file.name, arrbuf);
    return { file: file.name };
  }
}
