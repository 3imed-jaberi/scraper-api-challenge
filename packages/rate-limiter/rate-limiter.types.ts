export type { BaseProxyCredential } from '../../app/modules/types';
export interface RateLimiterCredential {
  reset: number;
  maxRequests: number;
  remainingRequests: number;
}
export interface IRateLimiter {
  setTimeout: (timeout: number) => IRateLimiter;
  setTotalRequests: (totalRequests: number) => IRateLimiter;
  build: () => RateLimiterCredential;
}
