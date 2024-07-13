import axios, { AxiosResponse } from 'axios';
import { RepoURL } from './types';
require('dotenv').config();

export class OctopusAPI {
  private baseURL: string;
  private authToken: string;

  constructor() {
    this.baseURL = 'https://api.github.com';
    this.authToken = process.env.GITHUB_AUTH_TOKEN || '';
  }

  async getPullRequests(repoURL: RepoURL): Promise<any[]> {
    const endpoint = `${this.baseURL}/repos/${repoURL.owner}/${repoURL.repo}/pulls?state=all`;
    const response: AxiosResponse<any[]> = await axios.get(endpoint,{
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    });

    return response.data;
  }

  async getReviews(pullRequestURL: string): Promise<any[]> {
    const endpoint = `${pullRequestURL}/reviews`;
    const response: AxiosResponse<any[]> = await axios.get(endpoint,{
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    });
    return response.data;
  }

  async getReviewComments(pullRequestURL: string): Promise<any[]> {
    const endpoint = `${pullRequestURL}/comments`;
    const response: AxiosResponse<any[]> = await axios.get(endpoint,{
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    });
    return response.data;
  }
}