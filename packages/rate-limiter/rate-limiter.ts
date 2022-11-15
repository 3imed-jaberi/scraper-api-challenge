import { getMicrotime } from '@scraper-api-challenge/time/micro';
import type { IRateLimiter, RateLimiterCredential } from './rate-limiter.types';

export class RateLimiter implements IRateLimiter {
  private _timeout: number;
  private _totalRequests: number;

  constructor() {
    // default values
    this._timeout = 60 * 60 * 1000; // 1h
    this._totalRequests = 80;
  }

  setTimeout(timeout: number): IRateLimiter {
    this._timeout = timeout;

    return this;
  }

  setTotalRequests(totalRequests: number): IRateLimiter {
    this._totalRequests = totalRequests;

    return this;
  }

  static getReset(timeout: number): number {
    const now = getMicrotime();
    const reset = (now + timeout * 1e3) / 1e6;

    return reset;
  }

  build(): RateLimiterCredential {
    return {
      reset: RateLimiter.getReset(this._timeout),
      maxRequests: this._totalRequests,
      remainingRequests: this._totalRequests,
    };
  }
}
