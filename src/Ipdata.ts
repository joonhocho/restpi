import axios from 'axios';
import { IpdataResponse } from 'tsapis';

export { IpdataResponse };

// https://ipdata.co/
export class Ipdata {
  constructor(public apiKey: string) {}

  public lookupIp(ip: string): Promise<IpdataResponse> {
    return axios
      .get<IpdataResponse>(`https://api.ipdata.co/${ip}?api-key=${this.apiKey}`)
      .then(({ data, status, statusText }) => {
        if (typeof data === 'object' && data && typeof data.ip === 'string') {
          return data;
        }
        throw new Error(JSON.stringify({ status, statusText }));
      });
  }
}
