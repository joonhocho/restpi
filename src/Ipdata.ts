import axios from 'axios';
import { IpdataResponse } from 'tsapis';

// https://ipdata.co/
export class Ipdata {
  constructor(public apiKey: string) {}

  public lookupIp(ip: string): Promise<IpdataResponse> {
    return axios
      .get(`https://api.ipdata.co/${ip}?api-key=${this.apiKey}`)
      .then((x) => x.data);
  }
}
