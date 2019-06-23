import axios, { AxiosResponse } from 'axios';
import {
  GoogleSafeBrowsingClientInfo,
  GoogleSafeBrowsingRequestBody,
  GoogleSafeBrowsingResponseBody,
  GoogleSafeBrowsingThreatInfo,
} from 'tsapis';
import { ExcludeKeys, OverwriteProps } from 'tsdef';

// https://developers.google.com/safe-browsing/v4/reference/rest/

export class GoogleSafeBrowsing {
  constructor(
    public apiKey: string,
    public client: GoogleSafeBrowsingClientInfo
  ) {}

  public lookup(
    body: ExcludeKeys<GoogleSafeBrowsingRequestBody, 'client'>
  ): Promise<GoogleSafeBrowsingResponseBody> {
    const data: GoogleSafeBrowsingRequestBody = {
      client: this.client,
      ...body,
    };

    return axios
      .post<GoogleSafeBrowsingResponseBody>(
        `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${this.apiKey}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(this.formatResponse);
  }

  public lookupUrls(
    urls: string[],
    body: OverwriteProps<
      ExcludeKeys<GoogleSafeBrowsingRequestBody, 'client'>,
      {
        threatInfo: ExcludeKeys<
          GoogleSafeBrowsingThreatInfo,
          'threatEntryTypes' | 'threatEntries'
        >;
      }
    >
  ): Promise<GoogleSafeBrowsingResponseBody> {
    return this.lookup({
      ...body,
      threatInfo: {
        threatEntryTypes: ['URL'],
        threatEntries: urls.map((url) => ({ url })),
        ...body.threatInfo,
      },
    });
  }

  private formatResponse({
    data,
  }: AxiosResponse<
    GoogleSafeBrowsingResponseBody
  >): GoogleSafeBrowsingResponseBody {
    if (data.matches && data.matches.length) {
      return data;
    }
    return {};
  }
}
