import { makeProxiesParser } from '@scraper-api-challenge/proxies-parser';
import { makeRateLimiter } from '@scraper-api-challenge/rate-limiter';
import { makeProxiesRateLimiterBinder } from '@scraper-api-challenge/proxies-rate-limiter-binder';
import { makeFSPersister } from '@scraper-api-challenge/persister';

import { ProxiesService } from './proxies.service';
import { config as proxiesConfig } from '../../../../config';

export function makeProxiesService() {
  const proxiesParser = makeProxiesParser();
  const rateLimiter = makeRateLimiter();
  const proxiesRateLimiterBinder = makeProxiesRateLimiterBinder();
  const fsPersister = makeFSPersister();
  const proxiesServiceContext = {
    proxiesParser,
    rateLimiter,
    proxiesRateLimiterBinder,
    fsPersister,
  };

  return new ProxiesService(proxiesServiceContext, proxiesConfig);
}
