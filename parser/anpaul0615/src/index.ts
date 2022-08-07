import { collect } from "./collector"
import { parse } from "./parser"
import { save } from "./repository"

const repoName = '<GIT-REPO>';

(async () => {
  try {
    const gitLog = await collect(repoName);
    const githruData = parse(gitLog);
    await save(repoName, githruData);
  } catch(e) {
    console.error('e : ', e);
  }
})();
