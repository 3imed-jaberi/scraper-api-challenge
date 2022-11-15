import { expect, describe, it } from 'vitest';

import { ProxySerializer } from './proxy-serializer';
import { makeProxySerializer } from './proxy-serializer.factory';
import { getTestPresets } from './proxy-serializer.test-utils';

describe('ProxySerializer', () => {
  it('should export the ProxySerializer correctly', () => {
    expect(makeProxySerializer).toBeDefined();
    expect(typeof makeProxySerializer).toBe('function');
  });

  it('should makeProxySerializer return an instance of ProxySerializer class correctly', () => {
    const ProxySerializerInstance = makeProxySerializer();
    expect(ProxySerializerInstance).toBeInstanceOf(ProxySerializer);
  });

  it('should makeProxySerializer expose ProxySerializer API correctly', () => {
    const ProxySerializerInstance = makeProxySerializer();
    expect(ProxySerializerInstance.encode).toBeDefined();
    expect(ProxySerializerInstance.decode).toBeDefined();
  });

  it('should serialize proxy credential to be a string correctly', () => {
    const presets = getTestPresets();
    const { proxyCredential, proxyLink } = presets.getExpectedProxy();
    const encodedProxy = makeProxySerializer().encode(proxyCredential);
    expect(encodedProxy).toEqual(proxyLink);
  });

  it('should deserialize proxy string to be an object correctly', () => {
    const presets = getTestPresets();
    const { proxyCredential, proxyLink } = presets.getExpectedProxy();
    const encodedProxy = makeProxySerializer().decode(proxyLink, 1);
    expect(encodedProxy).toEqual(proxyCredential);
  });
});
