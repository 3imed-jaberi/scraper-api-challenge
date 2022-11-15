export class ProxiesRateLimiterBinderInvalidChainingRateLimiterCredentialException extends Error {
  constructor() {
    super();
    this.name = 'ProxiesRateLimiterBinderInvalidChainingRateLimiterCredentialException';
    this.message =
      'Before running the `bind` method, make sure to invoke the `addRateLimiterCredential` method first!';
  }
}

export class ProxiesRateLimiterBinderInvalidChainingBaseProxiesException extends Error {
  constructor() {
    super();
    this.name = 'ProxiesRateLimiterBinderInvalidChainingBaseProxiesException';
    this.message =
      'Before running the `bind` method, make sure to invoke the `addBaseProxies` method first!';
  }
}
