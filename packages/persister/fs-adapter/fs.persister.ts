import { FileSystemIO, BaseProxyCredential } from './io';
import { IFSPersister } from './fs.persister.types';

export class FSPersister<ProxyCredential extends BaseProxyCredential>
  implements IFSPersister<ProxyCredential>
{
  constructor(private readonly io: FileSystemIO<ProxyCredential>) {}

  find(): ProxyCredential[] {
    return this.io.read().proxies;
  }

  findById(identifier: number): ProxyCredential {
    return this.io.read().proxies.find((proxy) => proxy.id === identifier)!;
  }

  save(proxy: ProxyCredential): void {
    const proxies = this.io.read().proxies.concat(proxy);
    this.io.write({ proxies });
  }

  update(newProxy: ProxyCredential): void {
    const proxies = this.io
      .read()
      .proxies.filter((proxy) => proxy.id !== newProxy.id)
      .concat(newProxy);
    this.io.write({ proxies });
  }

  delete(proxy: ProxyCredential): void {
    const proxies = this.io.read().proxies.filter((p) => p.id !== proxy.id);
    this.io.write({ proxies });
  }

  migrate(proxies: ProxyCredential[]) {
    this.io.write({ proxies });

    return this;
  }
}
