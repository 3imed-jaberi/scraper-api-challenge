import type { IProxiesParser, BaseProxyCredential } from './proxies-parser.types';
import { ProxiesParserInvalidChainingLoadException } from './proxies-parser.exceptions';

export class ProxiesParser<ProxyCredential extends BaseProxyCredential>
  implements IProxiesParser<ProxyCredential>
{
  private _proxies: ProxyCredential[];
  private _proxyLinks: string[];

  constructor() {
    this._proxies = [];
    this._proxyLinks = [];
  }

  load(proxies: string[]): IProxiesParser<ProxyCredential> {
    this._proxyLinks = proxies;

    return this;
  }

  parse(): IProxiesParser<ProxyCredential> {
    if (!this._proxyLinks.length) throw new ProxiesParserInvalidChainingLoadException();
    const proxiesDictionary = this._proxyLinks
      .map((proxy) =>
        proxy
          .split('://') // --> ['protocol', 'host:port']
          .map((proxy) => proxy.split(':')) // --> [['protocol'], ['host', 'port']]
          .flat() // --> ['protocol', 'host', 'port']
          .filter(Boolean),
      )
      .map(
        ([protocol, host, port], index) =>
          ({
            id: index,
            protocol,
            host,
            port: +port!,
          } as ProxyCredential),
      );
    this._proxies = proxiesDictionary;

    return this;
  }

  getProxies(): ProxyCredential[] {
    return this._proxies;
  }
}
