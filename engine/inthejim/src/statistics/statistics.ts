import { OctopusAPI } from "./octopus-api";
import { RepoURL, AuthorStatistics } from "./types";

export async function analyzeAuthorStatistics(
  repoURL: RepoURL
): Promise<AuthorStatistics[]> {
  const octopusAPI = new OctopusAPI();

  const pullRequests = await octopusAPI.getPullRequests(repoURL);
  
  const authorStatisticsMap = new Map<string, AuthorStatistics>();

  pullRequests.forEach((pr) => {
    const { user } = pr;
    const author = user.login;
    if (authorStatisticsMap.has(author)) {
      const authorStatistics = authorStatisticsMap.get(author);
      authorStatistics!.pullRequestCount++;
    } else {
      authorStatisticsMap.set(author, {
        author,
        pullRequestCount: 1,
        reviewCount: 0,
        reviewCommentCount: 0,
      });
    }
  });

  const pullRequestUrls = pullRequests.map((pr) => pr.url);

  const reviewsPromises = pullRequestUrls.map((url) => octopusAPI.getReviews(url));
  const reviewsArray = await Promise.all(reviewsPromises);
  const reviews=reviewsArray.flatMap((reviews)=>reviews);

  reviews.forEach((review) => {
    const { user: reviewUser } = review;
    const reviewAuthor = reviewUser.login;

    if (authorStatisticsMap.has(reviewAuthor)) {
      const authorStatistics = authorStatisticsMap.get(reviewAuthor)!;
      authorStatistics.reviewCount++;
    } else {
      authorStatisticsMap.set(reviewAuthor, {
        author: reviewAuthor,
        pullRequestCount: 0,
        reviewCount: 1,
        reviewCommentCount: 0,
      });
    }
  });


  const reviewCommentsPromises = pullRequestUrls.map((url) => octopusAPI.getReviewComments(url));
  const reviewCommentsArray = await Promise.all(reviewCommentsPromises);
  const reviewComments=reviewCommentsArray.flatMap((comments)=>comments);

  reviewComments.forEach((comment) => {
    const { user: commentUser } = comment;
    const commentAuthor = commentUser.login;

    if (authorStatisticsMap.has(commentAuthor)) {
      const authorStatistics = authorStatisticsMap.get(commentAuthor)!;
      authorStatistics.reviewCommentCount++;
    } else {
      authorStatisticsMap.set(commentAuthor, {
        author: commentAuthor,
        pullRequestCount: 0,
        reviewCount: 0,
        reviewCommentCount: 1,
      });
    }
  });

  const authorStatistics: AuthorStatistics[] = Array.from(
    authorStatisticsMap.values()
  );

  return authorStatistics;
}
