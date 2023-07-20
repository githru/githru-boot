import { testClassifyCommit } from "./commit_classifier/test";
import { testCollectAuthorStatistics } from "./statistics/test";
import { RepoURL } from "./statistics/types";

const repoURL: RepoURL = {
    owner: "githru",
    repo: "githru-boot",
};

testClassifyCommit();
testCollectAuthorStatistics(repoURL);