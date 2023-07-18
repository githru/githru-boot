export interface RepoURL {
  owner:string;
  repo: string;
};

export interface AuthorStatistics {
  author: string;
  pullRequestCount: number;
  reviewCount: number;
  reviewCommentCount: number;
}