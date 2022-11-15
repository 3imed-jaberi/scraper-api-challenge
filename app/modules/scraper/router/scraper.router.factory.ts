import { makeScraperController } from '../controller';

import { ScraperRouter } from './scraper.router';

export function makeScraperRouter() {
  const scraperController = makeScraperController();
  const scraperRouterContext = {
    scraperController,
  };

  return new ScraperRouter(scraperRouterContext);
}
