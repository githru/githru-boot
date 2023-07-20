import { CommitType } from "../../@types/commit";
import { ChoreCommit } from "../collector/choreCommit";
import { DocCommit } from "../collector/docCommit";
import { EtcCommit } from "../collector/etcCommit";
import { FeatureCommit } from "../collector/featureCommit";
import { FixCommit } from "../collector/fixCommit";
import { RefactorCommit } from "../collector/refactorCommit";

export const CommitKeywordMapper: CommitType.CommitKeywordMapper = {
  FEAT: FeatureCommit.getInstance(),
  FIX: FixCommit.getInstance(),
  DOC: DocCommit.getInstance(),
  CHORE: ChoreCommit.getInstance(),
  ETC: EtcCommit.getInstance(),
  REFACTOR: RefactorCommit.getInstance(),
};
