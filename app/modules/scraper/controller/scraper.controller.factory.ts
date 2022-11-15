import { makeProxiesRoulette } from '@scraper-api-challenge/proxies-roulette';
import { makeProxySerializer } from '@scraper-api-challenge/proxy-serializer';
import { ScraperController } from './scraper.controller';
import { makeRenderUIService, makeProxiesService } from '../services';

export function makeScraperController() {
  const proxiesRoulette = makeProxiesRoulette();
  const proxySerializer = makeProxySerializer();
  const proxiesService = makeProxiesService();
  const renderUIService = makeRenderUIService();
  const scraperControllerContext = {
    proxiesRoulette,
    proxySerializer,
    proxiesService,
    renderUIService,
  };

  return new ScraperController(scraperControllerContext);
}
