import axios from 'axios';
import { UserAgentAppResponse } from 'tsapis';

// https://useragent.app
export class UserAgentApp {
  constructor(public apiKey: string) {}

  public parseUserAgent(ua: string): Promise<UserAgentAppResponse> {
    return axios
      .get<UserAgentAppResponse>(
        `https://api.useragent.app/parse?key=${this.apiKey}&ua=${ua}`
      )
      .then(({ data, status, statusText }) => {
        if (typeof data === 'object' && data) {
          return data;
        }
        throw new Error(JSON.stringify({ status, statusText }));
      });
  }
}
