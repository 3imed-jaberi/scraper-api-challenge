import { expect, describe, it } from 'vitest';

import { RateLimiter } from './rate-limiter';
import { makeRateLimiter } from './rate-limiter.factory';

describe('RateLimiter', () => {
  it('should export the RateLimiter correctly', () => {
    expect(makeRateLimiter).toBeDefined();
    expect(typeof makeRateLimiter).toBe('function');
  });

  it('should makeRateLimiter return an instance of RateLimiter class correctly', () => {
    const rateLimiterInstance = makeRateLimiter();
    expect(rateLimiterInstance).toBeInstanceOf(RateLimiter);
  });

  it('should makeRateLimiter expose RateLimiter API correctly', () => {
    const rateLimiterInstance = makeRateLimiter();
    expect(rateLimiterInstance.setTimeout).toBeDefined();
    expect(rateLimiterInstance.setTotalRequests).toBeDefined();
    expect(rateLimiterInstance.build).toBeDefined();
  });

  it('should create a rate-limiter credential with custom configuration correctly', () => {
    const rateLimiterCredential = makeRateLimiter()
      .setTimeout(5_000)
      .setTotalRequests(1_000)
      .build();

    expect(typeof rateLimiterCredential.reset).toBe('number');
    expect(rateLimiterCredential).toMatchObject({
      maxRequests: 1_000,
      remainingRequests: 1_000,
    });
  });

  it('should create a rate-limiter credential with default configuration correctly', () => {
    const rateLimiterCredential = makeRateLimiter().build();

    expect(typeof rateLimiterCredential.reset).toBe('number');
    expect(rateLimiterCredential).toMatchObject({
      maxRequests: 80,
      remainingRequests: 80,
    });
  });
});
