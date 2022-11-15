import type { RateLimiterCredential } from '@scraper-api-challenge/rate-limiter';

import type { ProxyCredential } from '../../app/modules/types';

export type { RateLimiterCredential } from '@scraper-api-challenge/rate-limiter';

export interface IProxiesRateLimiterBinder {
  addRateLimiterCredential: (
    rateLimiterCredential: RateLimiterCredential,
  ) => IProxiesRateLimiterBinder;
  addBaseProxies: (proxies: ProxyCredential[]) => IProxiesRateLimiterBinder;
  bindProxieWithRateLimiter: () => IProxiesRateLimiterBinder;
  getProxies: () => ProxyCredential[];
}
