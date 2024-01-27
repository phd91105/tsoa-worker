import { RunStatus } from '@prisma/client/edge';
import type { Context } from 'hono';
import { fetcher } from 'itty-fetcher';
import _ from 'lodash';
import { inject, injectable } from 'tsyringe';

import { commonHeaders, triggerWorkflowUrl } from '@/constants';
import { HonoContext } from '@/constants/inject.keys';
import type { BatchRequest } from '@/interfaces/batch';
import { BatchRepository } from '@/repositories/batch';
import { ContextUtils } from '@/utils/context';
import batchRunner from '~/templates/batch';

@injectable()
export class BatchService {
  constructor(
    @inject(HonoContext) private readonly ctx: Context,
    @inject(BatchRepository) private readonly batchRepo: BatchRepository
  ) {}

  async triggerWorkflow(batchRequest: BatchRequest) {
    try {
      const batch = await this.batchRepo.create({
        name: 'pdfBatch',
        status: RunStatus.waiting,
        params: JSON.stringify(batchRequest)
      });

      await fetcher()
        .post(
          triggerWorkflowUrl(this.ctx.env.GH_REPO, 'batch-pdf.yml'),
          {
            ref: 'refs/heads/main',
            inputs: {
              template: batchRunner(batchRequest, {
                id: batch.id,
                url: _.trimEnd(this.ctx.req.url, '/'),
                auth: this.ctx.req.raw.headers.get('authorization')
              })
            }
          },
          {
            headers: {
              ...commonHeaders,
              authorization: 'Bearer ' + this.ctx.env.GH_TOKEN
            }
          }
        )
        .catch((error) => {
          this.ctx.executionCtx.waitUntil(
            ContextUtils.executeFn(
              this.batchRepo.update(batch.id, {
                status: RunStatus.failed
              })
            )
          );

          throw error;
        });

      this.ctx.executionCtx.waitUntil(
        ContextUtils.executeFn(
          this.batchRepo.update(batch.id, {
            status: RunStatus.running
          })
        )
      );

      return _.pick(batch, 'id');
    } catch (error) {
      throw error;
    }
  }

  async uploadFile(id: number, file: File) {
    const arrayBuffer = await file.arrayBuffer();

    this.ctx.executionCtx.waitUntil(
      this.ctx.env.storage.put(file.name, arrayBuffer)
    );

    this.ctx.executionCtx.waitUntil(
      ContextUtils.executeFn(
        this.batchRepo.update(id, {
          status: RunStatus.success,
          filePath: file.name
        })
      )
    );
  }
}
