export class ScraperTimeoutException extends Error {
  constructor() {
    super();
    this.name = 'ScrapeTimeoutException';
    this.message = 'Your scraper request take too much time to be resovled, even after retry!';
  }
}

export class ScraperInternalException extends Error {
  constructor(error: unknown) {
    super();
    this.name = 'ScrapeInternalException';
    this.message = 'Your scraper request take failed for some reason!';
    this.stack = error?.toString();
  }
}
