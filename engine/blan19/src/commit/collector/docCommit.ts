import { Commit } from "./commit";

export class DocCommit extends Commit {
  private static instance: DocCommit;

  public keyword: string = "Doc";

  public static getInstance() {
    if (!DocCommit.instance) DocCommit.instance = new DocCommit();
    return DocCommit.instance;
  }
}
