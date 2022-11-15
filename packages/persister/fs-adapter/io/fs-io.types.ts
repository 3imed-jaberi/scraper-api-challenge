export interface BaseProxyCredential {
  id: number;
  protocol?: string;
  host?: string;
  port?: number;
}

export interface IFileSystemIO<ProxyCredential> {
  read: () => Record<'proxies', ProxyCredential[]>;
  write: (content: Record<string, unknown>) => void;
}
