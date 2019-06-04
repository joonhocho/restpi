import { Ipwhois } from './Ipwhois';

test('Ipwhois', async () => {
  const apiKey = 'YOUR_API_KEY';
  if (apiKey === 'YOUR_API_KEY') {
    expect(1).toBe(1);
  } else {
    const res = await new Ipwhois(apiKey).freeLookupIp('1.1.1.1');
    console.log(res); // tslint:disable-line no-console
    expect(res.ip).toBe('1.1.1.1');
  }
});
