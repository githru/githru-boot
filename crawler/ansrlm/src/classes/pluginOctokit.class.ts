import {OctokitOptions} from '@octokit/core/dist-types/types';
import {Octokit} from '@octokit/rest';
import {retry} from '@octokit/plugin-retry';
import {throttling} from '@octokit/plugin-throttling';
import {ThrottlingOptions} from '@octokit/plugin-throttling/dist-types/types';
import {RequestError} from '@octokit/types/dist-types/RequestError';

export default class PluginOctokit extends Octokit.plugin(retry, throttling) {
  static instance: PluginOctokit;

  constructor(
    options: Partial<
      OctokitOptions &
        ThrottlingOptions & {
          retry: {
            retryRequest: (
              error: RequestError,
              retries: number,
              retryAfter: number
            ) => RequestError;
          };
        }
    >
  ) {
    super(options);
    if (PluginOctokit.instance) return PluginOctokit.instance;
    PluginOctokit.instance = this;
  }
}
