import type { GitUser, DifferenceStatistic } from "./CommitRaw";
import type { CommitMessageType } from "./CommitMessageType";

export interface CommitPrompt {
  sequence: number;
  index: string;
  author: GitUser;
  committer: GitUser;
  message: string;
  differenceStatistic: DifferenceStatistic;
  commitMessageType: CommitMessageType;
}