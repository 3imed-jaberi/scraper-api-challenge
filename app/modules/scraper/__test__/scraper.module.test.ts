import { expect, describe, it, beforeAll, afterAll } from 'vitest';
import request from 'supertest';

import { createApp, setup, cleanup, getScreenshotsFiles } from './scraper.module.test-utils';

describe('ScraperModule', () => {
  beforeAll(setup);
  afterAll(cleanup);

  it("should the scraper module respond with 400 when we don't pass the target url as query param correctly", async () => {
    const response = await request(createApp()).get('/scraper');

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual({
      ok: false,
      info: 'make sure to pass the url link as query param',
    });
  });

  it('should the scraper module respond with 500 when we pass invalid url on query params correctly', async () => {
    const url = 'https://www.auto-mobile';
    const response = await request(createApp()).get(`/scraper?url=${url}`);

    expect(response.statusCode).toEqual(500);
    expect(response.body.ok).toEqual(false);
    expect(response.body.error).toBeDefined();
  }, 120_000);

  it('should the scraper module respond correctly when we pass the url, debug, render and screenshot on query params correctly', async () => {
    const url = 'https://www.automobile.tn';
    const response = await request(createApp()).get(
      `/scraper?url=${url}&debug=true&render=true&screenshot=true`,
    );
    if (response.statusCode === 200) {
      expect(response.get('X-RateLimit-ID')).toBeDefined();
      expect(response.get('X-RateLimit-Protocol')).toBeDefined();
      expect(response.get('X-RateLimit-Host')).toBeDefined();
      expect(response.get('X-RateLimit-Port')).toBeDefined();
      expect(response.get('X-RateLimit-Rest')).toBeDefined();
      expect(response.get('X-RateLimit-Limit')).toBeDefined();
      expect(response.get('X-RateLimit-Remaining')).toBeDefined();
      const proxy = {
        id: +response.get('X-RateLimit-ID'),
        protocol: response.get('X-RateLimit-Protocol'),
        host: response.get('X-RateLimit-Host'),
        port: +response.get('X-RateLimit-Port'),
      };
      expect(response.statusCode).toEqual(200);
      expect(response.body.ok).toEqual(true);
      expect(response.body.debug).toBeDefined();
      expect(response.body.debug.proxies).toBeDefined();
      expect(response.body.debug.proxies).toEqual(expect.any(Array));
      expect(response.body.scraper).toBeDefined();
      expect(response.body.scraper.proxy).toEqual(proxy);
      expect(response.body.scraper.url).toEqual(url);
      expect(response.body.scraper.statusCode).toEqual(200);
      expect(response.body.scraper.headers).toBeDefined();
      expect(response.body.scraper.headers).toEqual(expect.any(Object));
      expect((response.body.scraper.body as string).includes('automobile')).toEqual(true);
      expect(getScreenshotsFiles().length).toEqual(1);
      return;
    }

    if (response.statusCode === 500) {
      expect(response.statusCode).toEqual(500);
      expect(response.body.ok).toEqual(false);
      expect(response.body.error).toBeDefined();
      return;
    }
  }, 120_000);
});
