import { RateLimiter } from './rate-limiter';

export function makeRateLimiter() {
  return new RateLimiter();
}
