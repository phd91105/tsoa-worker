import {
  Controller,
  FormField,
  Post,
  Response,
  Route,
  Security,
  Tags,
  UploadedFile,
} from '@tsoa/runtime';
import { inject, injectable } from 'tsyringe';

import { HttpStatus } from '@/enums/http';
import { SecurityType } from '@/middlewares/auth';
import { CommitFilterService } from '@/services/commit.filter';

@Tags('Filter Commit')
@Route('/commit')
@Security(SecurityType.githubToken)
@injectable()
export class FilterCommitController extends Controller {
  constructor(
    @inject(CommitFilterService)
    private readonly commitFilterService: CommitFilterService,
  ) {
    super();
  }

  @Post('/filter')
  @Response(HttpStatus.OK)
  cherryPick(
    @UploadedFile() csv: File,
    @FormField() organization: string,
    @FormField() repos: string,
    @FormField() branch: string,
  ) {
    return this.commitFilterService.cherryPick(csv, {
      organization,
      repos,
      branch,
    });
  }
}
