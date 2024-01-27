import type { Context } from 'hono';
import { fetcher } from 'itty-fetcher';
import _ from 'lodash';
import Papa from 'papaparse';
import { inject, injectable } from 'tsyringe';

import { commonHeaders, getRepoCommitUrl } from '@/constants';
import { HonoContext } from '@/constants/inject.keys';
import type {
  Commit,
  CSVType,
  MinMaxDate,
  PickOptions
} from '@/interfaces/github';
import { DateUtils } from '@/utils/date';

@injectable()
export class GithubService {
  constructor(@inject(HonoContext) private readonly ctx: Context) {}

  async cherryPick(file: File, options: PickOptions) {
    const { data } = await this.getCsvData(file);

    const listIssue = _.map(data, '#');
    const listDate = _.flatMap(data, (o) => [o.Created, o.Updated]);
    const minMaxDate = DateUtils.findMinMaxDates(listDate);

    const commitsData = await this.getCommitsDataForRepos(
      listIssue,
      minMaxDate,
      options
    );

    return commitsData;
  }

  private async getCsvData(file: File) {
    const textEncoder = new TextDecoder();
    const fileData = await file.arrayBuffer();

    const parsedData = Papa.parse<CSVType>(textEncoder.decode(fileData), {
      header: true,
      skipEmptyLines: true
    });

    return parsedData;
  }

  private async getCommitsDataForRepos(
    listIssue: string[],
    minMaxDate: MinMaxDate,
    options: PickOptions
  ) {
    const repos = _.map(_.split(options.repos, ','), _.trim);

    const commitDataPromises = _.map(repos, async (repo) => {
      const commitData = await this.getCommitData(repo, minMaxDate, options);

      return {
        repo,
        commits: this.filterCommit(listIssue, commitData),
        from: minMaxDate.minDate,
        to: minMaxDate.maxDate
      };
    });

    return Promise.all(commitDataPromises);
  }

  private filterCommit(listIssue: string[], data: Commit[]) {
    const taskRegEx = /#\d+/;

    const filtered = _.filter(data, (item) => {
      const issueMatch = item.commit?.message.match(taskRegEx);

      return (
        issueMatch &&
        item.committer?.login !== 'web-flow' &&
        _.includes(listIssue, _.first(issueMatch).substring(1))
      );
    });

    const listCommit = _.map(filtered, (item) => {
      const task = _.first(item.commit?.message.match(taskRegEx)).substring(1);

      return {
        task,
        message: item.commit?.message,
        committer: item.committer?.login,
        sha: item.sha.substring(0, 7)
      };
    });

    return listCommit;
  }

  private async getCommitData(
    repo: string,
    date: MinMaxDate,
    options: PickOptions
  ) {
    const allData = [];
    let page = 1;
    let hasMoreData = true;
    const perPage = 100;

    while (hasMoreData) {
      const data = await fetcher().get<Commit[]>(
        getRepoCommitUrl(options.organization, repo),
        {
          sha: options.branch,
          since: date.minDate,
          until: date.maxDate,
          per_page: perPage,
          page: page
        },
        {
          headers: {
            ...commonHeaders,
            authorization: this.ctx.req.header('authorization')
          }
        }
      );

      allData.push(...data);

      hasMoreData = data.length === perPage;
      page++;
    }

    return allData;
  }
}
