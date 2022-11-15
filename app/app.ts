import Koa from 'koa';
import compose from 'koa-compose';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import 'colors';

/**
 * '@ts-ignore' use to make typescript happy, because these module
 * didn't have typescript types. Yes, we can use the global declaration
 * file but it's not the best way! it would be better to ask the maintainer.
 */
// @ts-ignore
import noFavIcon from 'koa-no-favicon';
// @ts-ignore
import xRequestId from 'koa-better-request-id';
// @ts-ignore
import xResponseTime from 'koa-better-response-time';
// @ts-ignore
import errorHandler from 'koa-better-error-handler';
// @ts-ignore
import notFoundHandler from 'koa-404-handler';

import { makeScraperRouter } from './modules/scraper';

export class Application {
  static getPorts() {
    const port = parseInt(process.env['PORT'] || '3000');
    return port;
  }

  static prepareEngine() {
    // application engine
    const engine = new Koa();
    // error handler requirement
    // https://www.npmjs.com/package/koa-better-error-handler
    engine.context.onerror = errorHandler;
    engine.context['api'] = true;

    // routes
    const scraperRouter = makeScraperRouter().getRouter();
    const routersList = [
      scraperRouter.routes(),
      scraperRouter.allowedMethods(),
      // ...
    ];
    const routes = compose(routersList);

    // middlewares
    engine
      .use(noFavIcon())
      .use(logger())
      .use(helmet())
      .use(xRequestId())
      .use(xResponseTime())
      .use(routes)
      .use(notFoundHandler);

    return engine;
  }

  static run() {
    const port = Application.getPorts();
    Application.prepareEngine().listen(port, () =>
      console.log(`Application started at http://localhost:${port}`),
    );
  }
}
