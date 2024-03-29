import type { Prisma } from '@prisma/client/edge';
import {
  Body,
  Controller,
  Get,
  NoSecurity,
  Patch,
  Path,
  Post,
  Route,
  Security,
  SuccessResponse,
  Tags,
  UploadedFile
} from '@tsoa/runtime';
import type { Context } from 'hono';
import { inject, injectable } from 'tsyringe';

import { HonoContext } from '@/constants/injectKeys';
import { SecurityType } from '@/enums/auth';
import { HttpStatus, ResType } from '@/enums/http';
import type { BatchRequest } from '@/interfaces/batch';
import { BatchRepository } from '@/repositories/batch';
import { BatchService } from '@/services/batch';

@Tags('Batch')
@Route('/batch')
@Security(SecurityType.jwt)
@injectable()
export class BatchController extends Controller {
  constructor(
    @inject(BatchService)
    private readonly batchService: BatchService,
    @inject(BatchRepository)
    private readonly batchRepo: BatchRepository,
    @inject(HonoContext)
    private readonly ctx: Context
  ) {
    super();
  }

  @Post('/')
  @SuccessResponse(HttpStatus.CREATED)
  createBatch(@Body() batchRequest: BatchRequest) {
    this.setStatus(HttpStatus.CREATED);

    return this.batchService.sendBatchRequest(batchRequest);
  }

  @Get('/')
  @SuccessResponse(HttpStatus.OK)
  getBatch() {
    return this.batchRepo.findAll();
  }

  @Patch('{id}')
  @SuccessResponse(HttpStatus.NO_CONTENT)
  updateStatus(
    @Path() id: number,
    @Body() body: Prisma.BatchStatusUpdateInput
  ) {
    this.setStatus(HttpStatus.NO_CONTENT);

    return this.batchRepo.update(id, {
      status: body.status
    });
  }

  @Post('/fileUpload/{id}')
  @SuccessResponse(HttpStatus.NO_CONTENT)
  fileUpload(@Path() id: number, @UploadedFile() file: File) {
    this.setStatus(HttpStatus.NO_CONTENT);

    return this.batchService.uploadFile(id, file);
  }

  @Get('/file/{filePath}')
  @NoSecurity()
  @SuccessResponse(HttpStatus.OK)
  getFile(@Path() filePath: string) {
    this.setHeader('content-type', 'application/pdf');

    return this.ctx.env.storage.get(filePath, ResType.arrayBuffer);
  }
}
