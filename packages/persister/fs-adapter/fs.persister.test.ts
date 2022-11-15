import { expect, describe, it, beforeAll, afterAll } from 'vitest';

import { FSPersister } from './fs.persister';
import { makeFSPersister } from './fs.persister.factory';

import { setup, cleanup, queryHelpers } from './fs.persister.test-utils';

describe('FSPersister', () => {
  beforeAll(setup);
  afterAll(cleanup);

  it('should export the FSPersister correctly', () => {
    expect(makeFSPersister).toBeDefined();
    expect(typeof makeFSPersister).toBe('function');
  });

  it('should makeFSPersister return an instance of FSPersister class correctly', () => {
    const FSPersisterInstance = makeFSPersister();
    expect(FSPersisterInstance).toBeInstanceOf(FSPersister);
  });

  it('should makeFSPersister expose FSPersister API correctly', () => {
    const FSPersisterInstance = makeFSPersister();
    expect(FSPersisterInstance.find).toBeDefined();
    expect(FSPersisterInstance.findById).toBeDefined();
    expect(FSPersisterInstance.save).toBeDefined();
    expect(FSPersisterInstance.update).toBeDefined();
    expect(FSPersisterInstance.delete).toBeDefined();
    expect(FSPersisterInstance.migrate).toBeDefined();
  });

  it('should fs persister return all proxies through the find method correctly', () => {
    const proxies = makeFSPersister().find();
    expect(proxies.length).toEqual(queryHelpers.getProxiesLinksList().length);
  });

  it('should fs persister return one proxy through the findById method correctly', () => {
    const identifier = 0;
    const proxy = makeFSPersister().findById(identifier);
    expect(proxy.id).toEqual(identifier);
  });

  it('should fs persister add new proxy through the save method correctly', () => {
    makeFSPersister().save(queryHelpers.getProxy());
    expect(queryHelpers.getAll().length).toEqual(queryHelpers.getProxiesLinksList().length + 1);
  });

  it('should fs persister update exist proxy through the update method correctly', () => {
    const proxy = queryHelpers.getProxy();
    const identifier = proxy.id;
    expect(makeFSPersister().findById(identifier)).toEqual(proxy);
    const newProxy = queryHelpers.getNewProxy();
    makeFSPersister().update(newProxy);
    expect(queryHelpers.get(identifier)).toEqual(newProxy);
  });

  it('should fs persister delete exist proxy through the delete method correctly', () => {
    const proxy = queryHelpers.getProxy();
    makeFSPersister().delete(proxy);
    expect(queryHelpers.getAll().length).toEqual(queryHelpers.getProxiesLinksList().length);
  });

  it('should fs persister update all data through the migrate method correctly', () => {
    makeFSPersister().migrate([]);
    expect(queryHelpers.getAll().length).toEqual(0);
  });
});
