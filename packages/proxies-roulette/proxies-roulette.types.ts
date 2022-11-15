import type { BaseProxyCredential } from '../../app/modules/types';

export type { BaseProxyCredential } from '../../app/modules/types';
export interface IProxiesRoulette<ProxyCredential extends BaseProxyCredential> {
  prepare: (proxies: ProxyCredential[]) => IProxiesRoulette<ProxyCredential>;
  run: () => ProxyCredential;
}
