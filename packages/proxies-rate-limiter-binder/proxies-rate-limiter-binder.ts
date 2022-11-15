import {
  IProxiesRateLimiterBinder,
  RateLimiterCredential,
} from './proxies-rate-limiter-binder.types';
import type { ProxyCredential } from '../../app/modules/types';
import {
  ProxiesRateLimiterBinderInvalidChainingBaseProxiesException,
  ProxiesRateLimiterBinderInvalidChainingRateLimiterCredentialException,
} from './proxies-rate-limiter-binder.exceptions';

export class ProxiesRateLimiterBinder implements IProxiesRateLimiterBinder {
  private _proxies!: ProxyCredential[];
  private _rateLimiterCredential!: RateLimiterCredential;

  addRateLimiterCredential(rateLimiterCredential: RateLimiterCredential): ProxiesRateLimiterBinder {
    this._rateLimiterCredential = rateLimiterCredential;
    return this;
  }

  addBaseProxies(proxies: ProxyCredential[]): IProxiesRateLimiterBinder {
    this._proxies = proxies;
    return this;
  }

  bindProxieWithRateLimiter(): IProxiesRateLimiterBinder {
    if (!this._rateLimiterCredential) {
      throw new ProxiesRateLimiterBinderInvalidChainingRateLimiterCredentialException();
    }

    if (!this._proxies) {
      throw new ProxiesRateLimiterBinderInvalidChainingBaseProxiesException();
    }

    this._proxies = this._proxies.map((proxy) => ({
      ...proxy,
      rateLimiter: this._rateLimiterCredential,
    }));
    return this;
  }

  getProxies(): ProxyCredential[] {
    return this._proxies;
  }
}
