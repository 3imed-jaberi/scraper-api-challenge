import { expect, describe, it } from 'vitest';

import { ProxiesRateLimiterBinder } from './proxies-rate-limiter-binder';
import { makeProxiesRateLimiterBinder } from './proxies-rate-limiter-binder.factory';

import { getTestPresets } from './proxies-rate-limiter-binder.test-utils';

describe('ProxiesRateLimiterBinder', () => {
  it('should export the ProxiesRateLimiterBinder correctly', () => {
    expect(makeProxiesRateLimiterBinder).toBeDefined();
    expect(typeof makeProxiesRateLimiterBinder).toBe('function');
  });

  it('should makeProxiesRateLimiterBinder return an instance of ProxiesRateLimiterBinder class correctly', () => {
    const ProxiesRateLimiterBinderInstance = makeProxiesRateLimiterBinder();
    expect(ProxiesRateLimiterBinderInstance).toBeInstanceOf(ProxiesRateLimiterBinder);
  });

  it('should makeProxiesRateLimiterBinder expose ProxiesRateLimiterBinder API correctly', () => {
    const ProxiesRateLimiterBinderInstance = makeProxiesRateLimiterBinder();
    expect(ProxiesRateLimiterBinderInstance.addRateLimiterCredential).toBeDefined();
    expect(ProxiesRateLimiterBinderInstance.addBaseProxies).toBeDefined();
    expect(ProxiesRateLimiterBinderInstance.bindProxieWithRateLimiter).toBeDefined();
    expect(ProxiesRateLimiterBinderInstance.getProxies).toBeDefined();
  });

  it('should the binder bind proxies with rate limiter credantial correctly', () => {
    const presets = getTestPresets();

    const bindedProxies = makeProxiesRateLimiterBinder()
      .addRateLimiterCredential(presets.getRateLimitCredential())
      .addBaseProxies(presets.getParsedProxies())
      .bindProxieWithRateLimiter()
      .getProxies();

    expect(bindedProxies).toEqual(expect.any(Array));
    const { reset, ...rateLimit } = presets.getRateLimitCredential();
    expect(bindedProxies[0]).toMatchObject({
      id: 0,
      protocol: 'http',
      host: '60.51.17.107',
      port: 80,
      rateLimiter: rateLimit,
    });
  });

  it('should the binder throw when we invoke `bindProxieWithRateLimiter` method with out fire `addRateLimiterCredential` first correctly', () => {
    expect(() =>
      makeProxiesRateLimiterBinder()
        .addBaseProxies(getTestPresets().getParsedProxies())
        .bindProxieWithRateLimiter(),
    ).toThrow(
      /Before running the `bind` method, make sure to invoke the `addRateLimiterCredential` method first!/,
    );
  });

  it('should the binder throw when we invoke `bindProxieWithRateLimiter` method with out fire `addBaseProxies` first correctly', () => {
    expect(() =>
      makeProxiesRateLimiterBinder()
        .addRateLimiterCredential(getTestPresets().getRateLimitCredential())
        .bindProxieWithRateLimiter(),
    ).toThrow(
      /Before running the `bind` method, make sure to invoke the `addBaseProxies` method first!/,
    );
  });
});
