import type { RateLimiterCredential } from '@scraper-api-challenge/rate-limiter';

export interface BaseProxyCredential {
  id: number;
  protocol?: string;
  host?: string;
  port?: number;
}

export interface ProxyCredential extends BaseProxyCredential {
  rateLimiter?: RateLimiterCredential;
}
