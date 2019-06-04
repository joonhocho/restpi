import axios from 'axios';
import { IpwhoisResponse } from 'tsapis';

// https://ipwhois.io/
export class Ipwhois {
  constructor(public apiKey?: string) {}

  public freeLookupIp(ip: string): Promise<IpwhoisResponse> {
    return axios
      .get<IpwhoisResponse>(`http://free.ipwhois.io/json/${ip}`)
      .then(({ data, status, statusText }) => {
        if (typeof data === 'object' && data && typeof data.ip === 'string') {
          return data;
        }
        throw new Error(JSON.stringify({ status, statusText }));
      });
  }
}
