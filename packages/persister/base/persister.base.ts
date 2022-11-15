interface IPersisterCommand<ProxyCredential> {
  save: (proxy: ProxyCredential) => void;
  update: (newProxy: ProxyCredential) => void;
  delete: (proxy: ProxyCredential) => void;
}

interface IPersisterQuery<ProxyCredential> {
  find: () => ProxyCredential[];
  findById: (identifier: number) => ProxyCredential;
}

export interface IPersister<ProxyCredential>
  extends IPersisterCommand<ProxyCredential>,
    IPersisterQuery<ProxyCredential> {
  migrate: (proxies: ProxyCredential[]) => IPersister<ProxyCredential>;
}
