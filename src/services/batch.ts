import { type BatchStatus, RunStatus } from '@prisma/client/edge';
import type { Context } from 'hono';
import { fetcher } from 'itty-fetcher';
import { trimEnd } from 'lodash';
import { inject, injectable } from 'tsyringe';

import { commonHeaders, githubApiUrl, triggerWorkflowPath } from '@/constants';
import { HonoContext } from '@/constants/injectKeys';
import type { BatchRequest } from '@/interfaces/batch';
import { BatchRepository } from '@/repositories/batch';
import { ContextUtils } from '@/utils/context';

@injectable()
export class BatchService {
  constructor(
    @inject(HonoContext) private readonly ctx: Context,
    @inject(BatchRepository) private readonly batchRepo: BatchRepository
  ) {}

  async sendBatchRequest(batchRequest: BatchRequest) {
    const batch = await this.initializeBatch(batchRequest);

    try {
      this.updateBatchStatus(batch.id, RunStatus.running);
      await this.triggerGitHubAction(batch, batchRequest);

      return { id: batch.id, status: batch.status };
    } catch (err) {
      this.updateBatchStatus(batch.id, RunStatus.failed);

      throw err;
    }
  }

  async uploadFile(id: number, file: File) {
    const arrayBuffer = await file.arrayBuffer();

    this.ctx.executionCtx.waitUntil(
      this.ctx.env.storage.put(file.name, arrayBuffer)
    );

    this.updateBatchStatus(id, RunStatus.success, file.name);
  }

  private initializeBatch(batchRequest: BatchRequest) {
    return this.batchRepo.create({
      name: 'pdfBatch',
      status: RunStatus.waiting,
      params: JSON.stringify(batchRequest)
    });
  }

  private triggerGitHubAction(batch: BatchStatus, batchRequest: BatchRequest) {
    const reqData = this.prepareWorkflowRequestData(batch, batchRequest);
    const options = {
      headers: {
        ...commonHeaders,
        authorization: `Bearer ${this.ctx.env.GH_TOKEN}`
      }
    };
    const triggerPath = triggerWorkflowPath(this.ctx.env.GH_REPO, 'batch.yml');

    return fetcher({ base: githubApiUrl }).post(triggerPath, reqData, options);
  }

  private prepareWorkflowRequestData(
    batch: BatchStatus,
    batchRequest: BatchRequest
  ) {
    const url = trimEnd(this.ctx.req.url, '/');
    const auth = this.ctx.req.raw.headers.get('authorization');

    return {
      ref: 'refs/heads/main',
      inputs: {
        batchName: 'pdf',
        request: JSON.stringify({ ...batchRequest, id: batch.id, url, auth })
      }
    };
  }

  private updateBatchStatus(
    batchId: number,
    status: RunStatus,
    filePath?: string
  ) {
    this.ctx.executionCtx.waitUntil(
      ContextUtils.executeFn(
        this.batchRepo.update(batchId, { status, filePath })
      )
    );
  }
}
