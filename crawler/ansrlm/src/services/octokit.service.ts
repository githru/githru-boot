import PluginOctokit from '../classes/pluginOctokit.class';

interface Props {
  owner: string;
  repo: string;
}

export default class OctokitService {
  private props: Props;
  private octokit: PluginOctokit;

  constructor(props: Props) {
    this.props = {...props};
    this.octokit = new PluginOctokit({
      throttle: {
        onRateLimit: (retryAfter, options) => {
          const {
            method,
            url,
            request: {retryCount},
          } = options as {method: string; url: string; request: {retryCount: number}};
          this.octokit.log.warn(`[L] - request quota exhausted for request ${method} ${url}`);

          if (retryCount <= 1) {
            this.octokit.log.warn(`[L] - retrying after ${retryAfter} seconds!`);
            return true;
          } else {
            return false;
          }
        },
        onAbuseLimit: (retryAfter, options) => {
          const {method, url} = options as {method: string; url: string};
          this.octokit.log.warn(`[L] - abuse detected for request ${method} ${url}`);
        },
      },
    });
  }

  public getPullRequests = async (showDetail?: boolean) => {
    const {owner, repo} = this.props;

    const {data} = await this.octokit.rest.pulls.list({
      owner,
      repo,
    });

    if (showDetail) {
      const pullNumbers = data.map(item => item.number);

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
