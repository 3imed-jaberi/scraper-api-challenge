import type { ProxyCredential } from '../../../types';

export class RateLimiterTooManyRequestsException extends Error {
  constructor(proxy: ProxyCredential) {
    super();
    this.name = 'RateLimiterTooManyRequestsException';
    this.message = `You have too many requests on ${proxy.host} proxy in last period!`;
  }
}
