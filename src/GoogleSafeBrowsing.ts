import axios, { AxiosResponse } from 'axios';
import {
  GoogleSafeBrowsingRequestBody,
  GoogleSafeBrowsingResponseBody,
  GoogleSafeBrowsingThreatInfo,
} from 'tsapis';
import { ExcludeKeys, OverwriteProps } from 'tsdef';

// https://developers.google.com/safe-browsing/v4/reference/rest/

export class GoogleSafeBrowsing {
  constructor(public apiKey: string) {}

  public lookup(
    body: GoogleSafeBrowsingRequestBody
  ): Promise<GoogleSafeBrowsingResponseBody> {
    return axios
      .post<GoogleSafeBrowsingResponseBody>(
        `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${this.apiKey}`,
        body,
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
      GoogleSafeBrowsingRequestBody,
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
        ...body.threatInfo,
        threatEntryTypes: ['URL'],
        threatEntries: urls.map((url) => ({ url })),
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
