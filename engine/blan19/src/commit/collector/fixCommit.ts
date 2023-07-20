import { Commit } from "./commit";

export class FixCommit extends Commit {
  private static instance: FixCommit;

  public keyword: string = "Fix";

  public static getInstance() {
    if (!FixCommit.instance) FixCommit.instance = new FixCommit();
    return FixCommit.instance;
  }
}
