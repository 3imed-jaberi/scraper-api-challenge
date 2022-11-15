import type KoaRouter from 'koa-router';
import { IScraperController } from '../controller';

export { KoaRouter };

export interface IScraperRouter {
  getRouter: () => KoaRouter;
}
export interface ScraperRouterContext {
  scraperController: IScraperController;
}
