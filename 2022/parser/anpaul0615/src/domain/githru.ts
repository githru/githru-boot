import { PrettyFullerCommit } from "./commit"

export class GithruCommit {
  no: number;
  id: string;
  parents: Array<string>;
  diffStat: {
    changedFileCount: number;
    insertions: number;
    deletions: number;
    files: {
      [filename: string]: {
        insertions: number;
        deletions: number;
      };
    };
  };
  message: string;
  author: string;
  authorDate: string;
  committer: string;
  date: string;
  commitType: string;
  corpus: Array<string>;
  issues: Array<string>;
  tfidf: {
    [n: string]: number;
  };

  private constructor(props: PrettyFullerCommit) {
    this.no = 0;
    this.id = props.hash;
    this.parents = [];
    this.diffStat = {
      changedFileCount: 0,
      insertions: 0,
      deletions: 0,
      files: {}
    };
    this.message = props.message.replace(/\n    /, "\n").trim();
    this.author = `${props.author} <${props.authorEmail}>`;
    this.authorDate = props.authorDate;
    this.committer = `${props.committer} <${props.committerEmail}>`;
    this.date = props.commitDate;
    this.commitType = '';
    this.corpus = [];
    this.issues = [];
    this.tfidf = {};
  }

  static createFrom(props: PrettyFullerCommit) {
    const instance = new GithruCommit(props);

    if (props.parentHash1) {
      instance.parents.push(props.parentHash1);
    }

    if (props.parentHash2) {
      instance.parents.push(props.parentHash2);
    }

    if (props.numStat) {
      const numStats = props.numStat
        .split('\n')
        .map((r) => r.split('\t'))
        .map(([ins, dels, fileName]) => {
          return {
            ins: ins === '-' ? 0 : Number(ins),
            dels: dels === '-' ? 0 : Number(dels),
            fileName,
          };
        })
        .slice(0, -1);

      for (const { ins, dels, fileName } of numStats) {
        instance.diffStat.changedFileCount += 1;
        instance.diffStat.insertions += ins;
        instance.diffStat.deletions += dels;
        instance.diffStat.files[fileName] = {
          insertions: ins,
          deletions: dels,
        };
      };
    }

    return instance;
  }
}
