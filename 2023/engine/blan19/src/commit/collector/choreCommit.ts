import { Commit } from "./commit";

export class ChoreCommit extends Commit {
  private static instance: ChoreCommit;

  public keyword: string = "Chore";

  public static getInstance() {
    if (!ChoreCommit.instance) ChoreCommit.instance = new ChoreCommit();
    return ChoreCommit.instance;
  }
}
