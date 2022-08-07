export class CommitUnit {
  header: string;
  message: string;
  numStat?: string;

  private constructor(props: any) {
    this.header = props.header;
    this.message= props.message;
    this.numStat= props.numStat;
  }

  static createFrom(props: any) {
    return new CommitUnit(props);
  }
}

export class PrettyFullerCommit {
  hash: string;
  parentHash1?: string;
  parentHash2?: string;
  mergeHash1?: string;
  mergeHash2?: string;
  author: string;
  authorEmail: string;
  authorDate: string;
  committer: string;
  committerEmail: string;
  commitDate: string;
  message: string;
  numStat?: string;

  private constructor(props: any) {
    this.hash = props.hash;
    this.parentHash1= props.parentHash1;
    this.parentHash2= props.parentHash2;
    this.mergeHash1= props.mergeHash1;
    this.mergeHash2= props.mergeHash2;
    this.author= props.author;
    this.authorEmail= props.authorEmail;
    this.authorDate= props.authorDate;
    this.committer= props.commiter;
    this.committerEmail= props.commiterEmail;
    this.commitDate= props.commitDate;
    this.message= props.message;
    this.numStat= props.numStat;
  }

  static createFrom(props: any) {
    return new PrettyFullerCommit(props);
  }
}
