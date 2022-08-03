import { PrettyFullerCommit } from "./domain/commit"
import { GithruCommit } from "./domain/githru";

/**
 * https://git-scm.com/docs/pretty-formats
 * 
 * commit <hash-40> <hash-40> <hash-40>
 * [Merge: <hash-7> <hash-7>]
 * Author:     <author>
 * AuthorDate: <author-date>
 * Commit:     <committer>
 * CommitDate: <committer-date>
 * 
 *     <message>
 * 
 *     <num-stat>
 * 
 */
const CommitPattern =     /commit (?<hash>[0-9a-f]{40})(?: (?<parentHash1>[0-9a-f]{40}))?(?: (?<parentHash2>[0-9a-f]{40}))?/;
const MergePattern =      /(?:Merge: (?<mergeHash1>[0-9a-f]{7}) (?<mergeHash2>[0-9a-f]{7})\n)?/;
const AuthorPattern =     /Author:     (?<author>.+) <(?<authorEmail>.+)>/;
const AuthorDatePattern = /AuthorDate: (?<authorDate>.+)/;
const CommitterPattern =  /Commit:     (?<commiter>.+) <(?<commiterEmail>.+)>/;
const CommitDatePattern = /CommitDate: (?<commitDate>.+)/;
const MessagePattern =    /(?<message>(?:    .*\n?)+)/m;
const NumStatePattern =   /(?<numStat>(?:^[\d|-].+$\n?)+)?/m;

const PrettyFullerHeaderPattern = new RegExp([
  CommitPattern,
  /\n/,
  MergePattern,
  AuthorPattern,
  /\n/,
  AuthorDatePattern,
  /\n/,
  CommitterPattern,
  /\n/,
  CommitDatePattern,
].map((r) => r.source).join(""), "m");

const PrettyFullerPattern = new RegExp([
  PrettyFullerHeaderPattern,
  /\n/,
  /\n/,
  MessagePattern,
  /\n/,
  /\n/,
  NumStatePattern,
].map((r) => r.source).join(""), "gm");

export function parse(gitLog: string) {
  return [...gitLog.matchAll(PrettyFullerPattern)].map((r) => r.groups)
    .map(PrettyFullerCommit.createFrom)
    .map(GithruCommit.createFrom);
};
