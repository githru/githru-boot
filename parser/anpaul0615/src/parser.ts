import { CommitUnit, PrettyFullerCommit } from "./domain/commit"
import { GithruCommit } from "./domain/githru";

/**
 * <header>
 * 
 *     <message>
 * 
 *     <num-stat>
 * 
 */
const CommitHeaderPattern = /(?<header>commit (?:.+\n?)*)/
const CommitMessagePattern = /(?<message>(?:    .*\n?)+)/m
const CommitNumStatPattern = /(?<numStat>(?:^[\d|-].+$\n?)+)?/m

const CommitUnitPattern = new RegExp([
  CommitHeaderPattern,
  /\n/,
  /\n/,
  CommitMessagePattern,
  /\n/,
  /\n/,
  CommitNumStatPattern,
].map((r) => r.source).join(""), "gm");

function parseGitLogToCommitUnit(gitLog: string) {
  const matched = [...gitLog.matchAll(CommitUnitPattern)].map((r) => r.groups);
  return matched.map(CommitUnit.createFrom);
}

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

function parseCommitUnitToPrettyFullerCommit(commitUnit: CommitUnit) {
  const header = commitUnit.header.match(PrettyFullerHeaderPattern)?.groups;
  const message = commitUnit.message.match(CommitMessagePattern)?.groups;
  const numStat = commitUnit.numStat?.match(CommitNumStatPattern)?.groups;
  return PrettyFullerCommit.createFrom({
    ...header,
    ...message,
    ...numStat,
  });
}

function parsePrettyFullerCommitToGithruCommit(commit: PrettyFullerCommit) {
  return GithruCommit.createFrom(commit);
}

export function parse(gitLog: string) {
  return parseGitLogToCommitUnit(gitLog)
    .map(parseCommitUnitToPrettyFullerCommit)
    .map(parsePrettyFullerCommitToGithruCommit);
}
