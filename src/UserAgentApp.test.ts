import { UserAgentApp } from './UserAgentApp';

test('UserAgentApp', async () => {
  const apiKey = 'YOUR_API_KEY';
  if (apiKey === 'YOUR_API_KEY') {
    expect(1).toBe(1);
  } else {
    const res = await new UserAgentApp(apiKey).parseUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
    );
    console.log(res); // tslint:disable-line no-console
    expect(res.client_summary).toBe('Chrome 74.0.3729/Windows 10');
  }
});
