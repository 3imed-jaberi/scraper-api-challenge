# ScraperAPI Challenge: Rate Limiting Scraper

A little coding challenge, aim to make a small scraper service based on 5 checkpoints;

- 1: [x] Create a small REST API that receives in a URL with Javascript or Typescript
- 2: [x] Use one of the proxies provided to retrieve the HTML and headers from the URL
  given and return both to the caller.
- 3: [x] If the initial request fails, retry using a different proxy.
- 4: [x] Return a HTTP status code 500 if you are unable to get a good response within a
  reasonable amount of time.
- 5: [x] Optional bonus task (this is the difficult bit) - your service needs to rate limit
  requests going through individual proxies, ensuring that each gets no more than a
  defined number of requests per second.

## Technologies:

- TypeScript https://www.typescriptlang.org/
- Node.js http://nodejs.org
- Koa.js https://koajs.com
- Vitest <small>(Jest 2030)</small> https://vitest.dev/

> The application is based on OOP principles to facilitate Design Patterns detection.

## Guide to run the app locally and play arround it!

1. Make sure to have [Node.js](https://nodejs.org/en/download/) installed on your machine.
2. Redirect under the project folder.
3. Run `yarn` on the command line to install all dependencies and setup [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/).
4. Run `yarn app dev` on the command line to run the application.
5. Open your browser or any http client tool like [`postman`](https://www.postman.com/).
6. Pick your target website url, you want to scarpe it! for example: `https://www.automobile.tn/fr`.
7. Use `http://localhost:3000/scrape?url=https://www.automobile.tn/fr` on your http tool with `GET` http verb <small>(see the next section for infomations)</small>.
8. Now, you should see the response payload after a reasonable time!

## App Documentation

In this application, we have only one endpoint `/scrape` where can pass some query params:

- `url`: act as a link for the target website.
- `render`: render the collected HTML content on the default chromium browser where you can see it, in live preview.
- `screenshots`: act as a photographer, which takes a screenshot of the rendered HTML content whether in headless mode or not.
- `debug`: used to add proxies list to the response payload.

> In addition to achieving all the checkpoints, the endpoint re-render the collected HTML from the target website URL with the ability to take screenshots too.


#### License

---

[MIT](LICENSE) &copy; [Imed Jaberi](https://github.com/3imed-jaberi)
