import {Octokit} from '@octokit/rest';

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

    const {data} = await this.octokit.rest.pulls.list({
      owner,
      repo,
    });

    if (showDetail) {
      const pullNumbers: number[] = [];
      for (const pullRequest of data) {
        pullNumbers.push(pullRequest.number);
      }

      const detailPullRequests = await Promise.all(
        pullNumbers.map(pull_number =>
          this.octokit.rest.pulls.get({
            owner,
            repo,
            pull_number,
          })
        )
      );

      return JSON.stringify(detailPullRequests);
    }

    console.log('[L] - if want to see in detail, use the flag "detail" at the end of command');

    return JSON.stringify(data);
  };
}
