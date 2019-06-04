import axios from 'axios';
import { IpwhoisResponse } from 'tsapis';

// https://ipwhois.io/
export class Ipwhois {
  constructor(public apiKey?: string) {}

  public freeLookupIp(ip: string): Promise<IpwhoisResponse> {
    return axios.get(`http://free.ipwhois.io/json/${ip}`).then((x) => x.data);
  }
}
