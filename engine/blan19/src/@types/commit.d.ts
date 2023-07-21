import { Commit } from "../commit/collector/commit";

declare module CommitType {
  interface CommitKeywordMapper {
    [key: string]: Commit;
  }
}
