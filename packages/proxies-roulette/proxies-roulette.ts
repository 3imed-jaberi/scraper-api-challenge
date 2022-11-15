import type { IProxiesRoulette, BaseProxyCredential } from './proxies-roulette.types';

export class ProxiesRoulette<ProxyCredential extends BaseProxyCredential>
  implements IProxiesRoulette<ProxyCredential>
{
  private _proxies!: ProxyCredential[];

  prepare(proxies: ProxyCredential[]): IProxiesRoulette<ProxyCredential> {
    this._proxies = proxies;
    return this;
  }

  run(): ProxyCredential {
    const proxiesListSize = this._proxies.length;
    const randomIdentifier = Math.floor(Math.random() * proxiesListSize);
    const proxy = this._proxies.find((proxy) => proxy.id === randomIdentifier)!;

    return proxy;
  }
}
