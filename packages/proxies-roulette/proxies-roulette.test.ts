import { expect, describe, it } from 'vitest';

import { ProxiesRoulette } from './proxies-roulette';
import { makeProxiesRoulette } from './proxies-roulette.factory';
import { getTestPresets } from './proxies-roulette.test-utils';

describe('ProxiesRoulette', () => {
  it('should export the ProxiesRoulette correctly', () => {
    expect(makeProxiesRoulette).toBeDefined();
    expect(typeof makeProxiesRoulette).toBe('function');
  });

  it('should makeProxiesRoulette return an instance of ProxiesRoulette class correctly', () => {
    const ProxiesRouletteInstance = makeProxiesRoulette();
    expect(ProxiesRouletteInstance).toBeInstanceOf(ProxiesRoulette);
  });

  it('should makeProxiesRoulette expose ProxiesRoulette API correctly', () => {
    const ProxiesRouletteInstance = makeProxiesRoulette();
    expect(ProxiesRouletteInstance.prepare).toBeDefined();
    expect(ProxiesRouletteInstance.run).toBeDefined();
  });

  it('should proxies roulette return a random proxy correctly', () => {
    const presets = getTestPresets();
    const proxies = presets.getParsedProxies();
    const randomProxy = makeProxiesRoulette().prepare(proxies).run();

    expect(proxies.includes(randomProxy)).toBeTruthy();
    expect(Object.keys(randomProxy)).toEqual(['id', 'protocol', 'host', 'port']);
  });
});
