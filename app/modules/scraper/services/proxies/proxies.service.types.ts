import { IProxiesParser } from '@scraper-api-challenge/proxies-parser';
import { IRateLimiter } from '@scraper-api-challenge/rate-limiter';
import { IProxiesRateLimiterBinder } from '@scraper-api-challenge/proxies-rate-limiter-binder';
import { IPersister } from '@scraper-api-challenge/persister/base/persister.base';
import type { ProxyCredential } from '../../../types';

import { config } from '../../../../config';

export type { ProxyCredential } from '../../../types';

export type ProxiesConfig = typeof config;
export interface ProxiesServiceContext {
  proxiesParser: IProxiesParser<ProxyCredential>;
  rateLimiter: IRateLimiter;
  proxiesRateLimiterBinder: IProxiesRateLimiterBinder;
  fsPersister: IPersister<ProxyCredential>;
}

export interface IProxiesService {
  makeProxies: () => IProxiesService;
  deploy: (prevProxy: ProxyCredential) => IProxiesService;
  getProxies: () => ProxyCredential[];
}
