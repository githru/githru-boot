import { Commit } from "./commit";

export class EtcCommit extends Commit {
  private static instance: EtcCommit;

  public keyword: string = "Etc";

  public static getInstance() {
    if (!EtcCommit.instance) EtcCommit.instance = new EtcCommit();
    return EtcCommit.instance;
  }
}
