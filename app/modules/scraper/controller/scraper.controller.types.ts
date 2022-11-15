import { Middleware } from 'koa';
import type { RequestPromiseOptions } from 'request-promise-native';
import { IProxySerializer } from '@scraper-api-challenge/proxy-serializer';
import { IProxiesRoulette } from '@scraper-api-challenge/proxies-roulette';
import { IProxiesService } from '../services/proxies';
import { IRenderUIService } from '../services/render-ui';
import type { ProxyCredential } from '../../types';

export type { FullResponse } from 'request-promise-native';
export type RequestConfiguration = { retry?: boolean; url: string } & RequestPromiseOptions;
export { Context } from 'koa';
export interface IScraperController {
  handleGetRequest: Middleware;
}
export interface ScraperControllerContext {
  proxiesRoulette: IProxiesRoulette<ProxyCredential>;
  proxySerializer: IProxySerializer<ProxyCredential>;
  proxiesService: IProxiesService;
  renderUIService: IRenderUIService;
}
export interface GetRequestQueryParams {
  url?: string;
  render: boolean;
  screenshot: boolean;
  debug: boolean;
}
