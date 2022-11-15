import type { BaseProxyCredential } from '../../app/modules/types';

export type { BaseProxyCredential } from '../../app/modules/types';
export interface IProxiesParser<ProxyCredential extends BaseProxyCredential> {
  load: (proxies: string[]) => IProxiesParser<ProxyCredential>;
  parse: () => IProxiesParser<ProxyCredential>;
  getProxies: () => ProxyCredential[];
}
