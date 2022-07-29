import {Octokit} from '@octokit/rest';
import {DetailPullRequest} from '../types/pullRequest.type';

interface Props {
  owner: string;
  repo: string;
}

export default class OctokitService {
  private props: Props;
  private octokit: Octokit;

  constructor(props: Props) {
    this.props = {...props};
    this.octokit = new Octokit();
  }

  public getPullRequests = async (showDetail?: boolean) => {
    const {owner, repo} = this.props;

    if (showDetail) {
      const {data} = await this.octokit.rest.pulls.list({
        owner,
        repo,
      });

      const pullNumbers: number[] = [];
      for (const pullRequest of data) {
        pullNumbers.push(pullRequest.number);
      }

      const detailPullRequests: DetailPullRequest[] = [];
      for (const pull_number of pullNumbers) {
        const detailPullRequest = await this.octokit.rest.pulls.get({
          owner,
          repo,
          pull_number,
        });
        detailPullRequests.push(detailPullRequest);
      }

      return JSON.stringify(detailPullRequests);
    } else {
      const {data} = await this.octokit.rest.pulls.list({
        owner,
        repo,
      });

      console.log('[L] - if want to see in detail, use the flag "detail" at the end of command');

      return JSON.stringify(data);
    }
  };
}
