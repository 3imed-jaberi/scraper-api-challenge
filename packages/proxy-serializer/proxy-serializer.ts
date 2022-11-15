import { IProxySerializer, BaseProxyCredential } from './proxy-serializer.types';

export class ProxySerializer<ProxyCredential extends BaseProxyCredential>
  implements IProxySerializer<ProxyCredential>
{
  encode(proxy: ProxyCredential): string {
    const { protocol, host, port } = proxy;
    const url = `${protocol}://${host}:${port}`;
    return url;
  }

  decode<ProxyCredential>(proxy: string, index: number): ProxyCredential {
    const [protocol, host, port] = proxy
      .split('://') // --> ['protocol', 'host:port']
      .map((proxy) => proxy.split(':')) // --> [['protocol'], ['host', 'port']]
      .flat() // --> ['protocol', 'host', 'port']
      .filter(Boolean);

    return {
      id: index,
      protocol,
      host,
      port: +port!,
    } as ProxyCredential;
  }
}
