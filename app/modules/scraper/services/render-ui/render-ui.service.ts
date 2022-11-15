import puppeteer from 'puppeteer';

import { RenderUIException } from './render-ui.service.exceptions';
import type { IRenderUIService, RenderEngineConfigurationParam } from './render-ui.service.types';

export class RenderUIService implements IRenderUIService {
  private _screenshotFolderName: string;

  constructor() {
    const monorepoRedirection = '../';
    this._screenshotFolderName = monorepoRedirection + 'app/screenshots';
  }

  setScreenshotFolderName(screenshotFolderName: string): IRenderUIService {
    this._screenshotFolderName = screenshotFolderName;
    return this;
  }

  async mount(renderEngineConfiguration: RenderEngineConfigurationParam) {
    const { html, render, screenshot } = renderEngineConfiguration;
    const browser = await puppeteer.launch({ headless: !render });
    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      await page.waitForTimeout(4000);
      if (screenshot) {
        await page.screenshot({
          path: `${this._screenshotFolderName}/scraper-api-challenge-${Date.now()}.png`,
        });
      }
    } catch (error) {
      console.error(error);
      throw new RenderUIException(error);
    } finally {
      await browser.close();
    }
  }
}
