import request from 'request-promise-native';
import 'colors';

import type {
  IScraperController,
  ScraperControllerContext,
  GetRequestQueryParams,
  Context,
  RequestConfiguration,
  FullResponse,
} from './scraper.controller.types';
import { ScraperTimeoutException, ScraperInternalException } from './scraper.controller.exceptions';

export class ScraperController implements IScraperController {
  private static _scraperControllerContext: ScraperControllerContext;

  constructor(scraperControllerContext: ScraperControllerContext) {
    ScraperController._scraperControllerContext = scraperControllerContext;
  }

  async handleGetRequest(ctx: Context) {
    function getQueryParams(query: Context['query']): GetRequestQueryParams {
      const { url, debug, render, screenshot } = {
        debug: false,
        render: false,
        screenshot: false,
        ...query,
      } as GetRequestQueryParams;

      return {
        url,
        debug: Boolean(debug),
        render: Boolean(render),
        screenshot: Boolean(screenshot),
      };
    }
    const { url, debug, render, screenshot } = getQueryParams(ctx.query);

    if (!url) {
      ctx.status = 400;
      ctx.body = { ok: false, info: 'make sure to pass the url link as query param' };
      return;
    }

    const { proxiesRoulette, proxySerializer, proxiesService, renderUIService } =
      ScraperController._scraperControllerContext;
    // don't worry, the `makeProxies` fasade method will run once!
    proxiesService.makeProxies();
    const roulette = proxiesRoulette.prepare(proxiesService.getProxies());
    const proxy = roulette.run();
    const proxyLink = proxySerializer.encode(proxy);
    const proxies = proxiesService.deploy(proxy).getProxies();

    try {
      const command = async (requestConfig: RequestConfiguration): Promise<FullResponse> => {
        const defaultRequestConfig = {
          url: '',
          method: 'GET',
          resolveWithFullResponse: true,
          retry: true,
          timeout: 60_000,
        };
        const { retry, ...config } = Object.assign({}, defaultRequestConfig, requestConfig);
        try {
          const response = (await request(config)) as FullResponse;
          // retry the scrape request when we receive unsuccess status code from the request.
          // probably, it's useful to handle the invalid response with the success status code.
          if (!response.statusCode.toString().startsWith('2') && retry) {
            return command({
              ...config,
              retry: false,
              proxy: proxySerializer.encode(roulette.run()),
            });
          }

          return response;
        } catch (error) {
          // retry the command when we catch any exception.
          if (retry) {
            console.log('---> 👀: running retry command!'.bgRed);
            return command({
              ...config,
              retry: false,
              proxy: proxySerializer.encode(roulette.run()),
            });
          }

          // throw when we catch the `ScrapeTimeoutException` exception.
          const isTimeoutException = (error as any)?.error?.code === 'ESOCKETTIMEDOUT';
          if (isTimeoutException) {
            console.log('---> 👀: timeout exception!'.bgRed);
            throw new ScraperTimeoutException();
          }

          // otherwise, throw the exception!
          console.log('---> 👀: internal error produced during the command flow!'.bgRed);
          console.error(error);
          throw new ScraperInternalException(error);
        }
      };

      // url: "https://www.automobile.tn/fr"
      const response = await command({ url, proxy: proxyLink, timeout: 10_000 });
      const { statusCode, headers, body } = response;

      if (render || screenshot) {
        await renderUIService.mount({ html: body, render, screenshot });
      }

      const {
        // @ts-ignore
        rateLimiter: { reset, maxRequests, remainingRequests },
        ...baseProxy
      } = proxy;
      const { id, protocol, host, port } = baseProxy;
      ctx.set('X-RateLimit-ID', id.toString());
      ctx.set('X-RateLimit-Protocol', protocol!);
      ctx.set('X-RateLimit-Host', host!);
      ctx.set('X-RateLimit-Port', port!.toString());
      ctx.set('X-RateLimit-Remaining', remainingRequests.toString());
      ctx.set('X-RateLimit-Rest', reset.toString());
      ctx.set('X-RateLimit-Limit', maxRequests.toString());

      const scraper = { proxy: baseProxy, url, statusCode, headers, body };
      const debugPayload = debug ? { debug: { proxies } } : {};
      ctx.status = 200;
      ctx.body = { ok: true, ...debugPayload, scraper };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { ok: false, error };
    }
  }
}
