import {isValidForOctokit, getOctokitProps} from './utils/input.util';
import OctokitService from './services/octokit.service';

(async () => {
  const input = process.argv[2];

  if (!input || !isValidForOctokit(input)) {
    throw new Error('[E] - please enter as npm run start ${owner}/${repo}');
  }

  const {owner, repo} = getOctokitProps(input);

  const octokitService = new OctokitService({owner, repo});

  const isDetail = process.argv[3];

  const result = await octokitService.getPullRequests(!!isDetail && isDetail === 'detail');
  console.log('[L] - pullRequests are: \n', result);
})();
