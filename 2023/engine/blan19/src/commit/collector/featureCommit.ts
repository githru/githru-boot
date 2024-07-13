import { Commit } from "./commit";

export class FeatureCommit extends Commit {
  private static instance: FeatureCommit;

  public keyword: string = "Feature";

  public static getInstance() {
    if (!FeatureCommit.instance) FeatureCommit.instance = new FeatureCommit();
    return FeatureCommit.instance;
  }
}
