import { ms } from '@scraper-api-challenge/time/ms';
import {
  IProxiesService,
  ProxiesConfig,
  ProxiesServiceContext,
  ProxyCredential,
} from './proxies.service.types';
import { RateLimiterTooManyRequestsException } from './proxies.service.exceptions';

export class ProxiesService implements IProxiesService {
  private static _proxies: ProxyCredential[];
  private static _proxiesServiceContext: ProxiesServiceContext;
  private static _alreadyPatched: boolean;
  private _proxiesConfig: ProxiesConfig;

  constructor(proxiesServiceContext: ProxiesServiceContext, proxiesConfig: ProxiesConfig) {
    ProxiesService._alreadyPatched = false;
    ProxiesService._proxiesServiceContext = proxiesServiceContext;
    this._proxiesConfig = proxiesConfig;
  }

  makeProxies(): IProxiesService {
    if (ProxiesService._alreadyPatched) return this;
    ProxiesService._alreadyPatched = true;
    const { proxiesParser, rateLimiter, proxiesRateLimiterBinder } =
      ProxiesService._proxiesServiceContext;
    // const collectedProxies = ['http://47.242.43.30:1080'];
    const proxies = proxiesRateLimiterBinder
      .addBaseProxies(proxiesParser.load(this._proxiesConfig.proxiesList).parse().getProxies())
      // 4. update the proxy with update rate-limiter credentials
      .addRateLimiterCredential(
        rateLimiter
          .setTimeout(this._proxiesConfig.ratelimit.timeout)
          .setTotalRequests(this._proxiesConfig.ratelimit.totalRequests)
          .build(),
      )
      .bindProxieWithRateLimiter()
      .getProxies();

    ProxiesService._proxies = proxies;

    return this;
  }

  deploy(prevProxy: ProxyCredential): IProxiesService {
    const { fsPersister } = ProxiesService._proxiesServiceContext;
    const { remainingRequests = 0, reset = 0 } = prevProxy?.rateLimiter || {};
    const nextRemainingRequests = remainingRequests - 1;
    // re-init on expired check!
    const delta = (reset * 1000 - Date.now()) | 0;
    const isExpired = ms(delta).startsWith('-');
    if (isExpired) {
      ProxiesService._alreadyPatched = false;
      return this.makeProxies();
    }

    if (nextRemainingRequests < 0) {
      throw new RateLimiterTooManyRequestsException(prevProxy);
    }

    const nextProxy = {
      ...prevProxy,
      rateLimiter: {
        ...prevProxy.rateLimiter,
        remainingRequests: nextRemainingRequests,
      },
    } as ProxyCredential;

    ProxiesService._proxies = ProxiesService._proxies
      .filter((proxy) => proxy.id !== nextProxy.id)
      .concat(nextProxy)
      // sort by id
      .sort((a, b) => a.id - b.id);
    //
    fsPersister.migrate(ProxiesService._proxies);

    return this;
  }

  getProxies(): ProxyCredential[] {
    return ProxiesService._proxies;
  }
}
