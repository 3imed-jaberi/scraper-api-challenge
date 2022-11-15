import Router from 'koa-router';

import { IScraperRouter, ScraperRouterContext, KoaRouter } from './scraper.router.types';

export class ScraperRouter implements IScraperRouter {
  constructor(private readonly scraperRouterContext: ScraperRouterContext) {}

  getRouter(): KoaRouter {
    const router = new Router();
    router.get('/scraper', this.scraperRouterContext.scraperController.handleGetRequest);

    return router;
  }
}
