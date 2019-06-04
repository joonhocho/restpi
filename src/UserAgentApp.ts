import axios from 'axios';
import { UserAgentAppResponse } from 'tsapis';

// https://useragent.app
export class UserAgentApp {
  constructor(public apiKey: string) {}

  public parseUserAgent(ua: string): Promise<UserAgentAppResponse> {
    return axios
      .get(`https://api.useragent.app/parse?key=${this.apiKey}&ua=${ua}`)
      .then((x) => x.data);
  }
}
