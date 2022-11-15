import type { BaseProxyCredential } from '../../app/modules/types';

export type { BaseProxyCredential } from '../../app/modules/types';
export interface IProxySerializer<ProxyCredential extends BaseProxyCredential> {
  encode: (proxy: ProxyCredential) => string;
  decode: (proxy: string, index: number) => ProxyCredential;
}
