import { expect, describe, it } from 'vitest';

import { ProxiesParser } from './proxies-parser';
import { makeProxiesParser } from './proxies-parser.factory';

import { getTestPresets } from './proxies-parser.test-utils';

describe('ProxiesParser', () => {
  it('should export the ProxiesParser correctly', () => {
    expect(makeProxiesParser).toBeDefined();
    expect(typeof makeProxiesParser).toBe('function');
  });

  it('should makeProxiesParser return an instance of ProxiesParser class correctly', () => {
    const ProxiesParserInstance = makeProxiesParser();
    expect(ProxiesParserInstance).toBeInstanceOf(ProxiesParser);
  });

  it('should makeProxiesParser expose ProxiesParser API correctly', () => {
    const ProxiesParserInstance = makeProxiesParser();
    expect(ProxiesParserInstance.load).toBeDefined();
    expect(ProxiesParserInstance.parse).toBeDefined();
    expect(ProxiesParserInstance.getProxies).toBeDefined();
  });

  it('should proxies parser return list of object proxies correctly', () => {
    const presets = getTestPresets();
    const { proxiesLinksList, proxiesCredentialsList } = presets.getExpectedProxies();
    const parsedProxies = makeProxiesParser().load(proxiesLinksList).parse().getProxies();

    expect(parsedProxies).toEqual(proxiesCredentialsList);
  });

  it('should proxies parser throw when proxies list is not founded correctly', () => {
    expect(() => makeProxiesParser().parse().getProxies()).toThrow(
      /Before running the `parse` method, make sure to invoke the `load` method first!/,
    );
  });
});
