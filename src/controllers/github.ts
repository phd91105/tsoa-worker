import {
  Controller,
  FormField,
  Post,
  Route,
  Security,
  SuccessResponse,
  Tags,
  UploadedFile
} from '@tsoa/runtime';
import { inject, injectable } from 'tsyringe';

import { SecurityType } from '@/enums/auth';
import { HttpStatus } from '@/enums/http';
import { GithubService } from '@/services/github';

@Tags('Filter Commit')
@Route('/commit')
@Security(SecurityType.githubToken)
@injectable()
export class GithubController extends Controller {
  constructor(
    @inject(GithubService)
    private readonly githubService: GithubService
  ) {
    super();
  }

  @Post('/filter')
  @SuccessResponse(HttpStatus.OK)
  cherryPick(
    @UploadedFile() csv: File,
    @FormField() organization: string,
    @FormField() repos: string,
    @FormField() branch: string
  ) {
    return this.githubService.cherryPick(csv, {
      organization,
      repos,
      branch
    });
  }
}
