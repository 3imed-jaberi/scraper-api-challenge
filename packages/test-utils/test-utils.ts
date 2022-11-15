import { makeRateLimiter } from '@scraper-api-challenge/rate-limiter';
import { makeProxiesParser } from '@scraper-api-challenge/proxies-parser';

const proxiesList = [
  'http://60.51.17.107:80',
  'http://95.216.136.105:8888',
  'http://1.64.237.92:8888',
  'http://156.34.187.155:8888',
  'http://65.21.54.229:8888',
  'http://111.90.147.212:8118',
  'http://140.227.80.237:3180',
  'http://200.105.215.22:33630',
  'http://182.253.109.140:8080',
  'http://47.242.43.30:1080',
];

const getParsedProxies = () => {
  const proxies = makeProxiesParser().load(proxiesList).parse().getProxies();
  return proxies;
};

const getRateLimitCredential = () => makeRateLimiter().build();

const getExpectedProxy = () => {
  const proxyLink = 'http://60.51.17.107:80';
  const proxyCredential = {
    id: 1,
    protocol: 'http',
    host: '60.51.17.107',
    port: 80,
  };

  return {
    proxyLink,
    proxyCredential,
  };
};

const getExpectedProxies = () => {
  const proxiesLinksList = ['http://60.51.17.107:80'];
  const proxiesCredentialsList = [
    {
      id: 0,
      protocol: 'http',
      host: '60.51.17.107',
      port: 80,
    },
  ];

  return {
    proxiesLinksList,
    proxiesCredentialsList,
  };
};

export const getTestPresets = () => ({
  getExpectedProxies,
  getExpectedProxy,
  getRateLimitCredential,
  getParsedProxies,
});
