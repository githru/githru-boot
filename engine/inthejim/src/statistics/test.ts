import { analyzeAuthorStatistics } from './statistics';
import { RepoURL, AuthorStatistics } from './types';

export async function testCollectAuthorStatistics(repoURL: RepoURL): Promise<void> {
  try {
    console.log('Repository:', repoURL);
    const authorStatistics: AuthorStatistics[] = await analyzeAuthorStatistics(repoURL);
    console.log('Statistics:');
    console.log(authorStatistics);

    const authors = authorStatistics.map((stat) => stat.author);
    console.log('Authors in the repository:', authors);

  } catch (error) {
    console.error('error for collecting statistics', error);
  }
}

