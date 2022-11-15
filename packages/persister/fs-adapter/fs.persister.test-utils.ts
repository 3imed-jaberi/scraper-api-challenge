import { makeProxiesParser } from '@scraper-api-challenge/proxies-parser';

import fs from 'node:fs';
import path from 'node:path';

import { makeFSPersister } from './fs.persister.factory';
import { makeFileSystemIO } from './io/fs-io.factory';

const io = makeFileSystemIO();

export const queryHelpers = {
  getProxiesLinksList: () => [
    'http://60.51.17.107:80',
    'http://95.216.136.105:8888',
    'http://1.64.237.92:8888',
    'http://156.34.187.155:8888',
    'http://65.21.54.229:8888',
    'http://111.90.147.212:8118',
    'http://140.227.80.237:3180',
    'http://200.105.215.22:33630',
    'http://182.253.109.140:8080',
    'http://47.242.43.30:1080',
  ],
  getProxy: () => ({
    id: 100,
    protocol: 'http',
    host: '100.1.1.1',
    port: 100,
  }),
  getNewProxy: () => ({
    id: 100,
    protocol: 'http',
    host: '100.1.100.1',
    port: 200,
  }),
  getAll: () => makeFSPersister().find(),
  get: (id: number) => makeFSPersister().findById(id),
};

export const setup = () => {
  const proxiesLinksList = queryHelpers.getProxiesLinksList();
  io._withSafeFile();
  io.write({
    proxies: makeProxiesParser().load(proxiesLinksList).parse().getProxies(),
  });
};

export const cleanup = () => {
  const basePath = io._getBasePath();
  fs.rmSync(basePath, { force: true, recursive: true });
  fs.mkdirSync(basePath);
  const gitkeepPath = path.resolve(basePath, '.gitkeep');
  fs.writeFileSync(gitkeepPath, '');
};
