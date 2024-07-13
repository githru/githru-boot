import { Commit } from "./commit";

export class RefactorCommit extends Commit {
  private static instance: RefactorCommit;

  public keyword: string = "Fix";

  public static getInstance() {
    if (!RefactorCommit.instance)
      RefactorCommit.instance = new RefactorCommit();
    return RefactorCommit.instance;
  }
}
