import { makeFileSystemIO } from './io';
import { FSPersister } from './fs.persister';

export function makeFSPersister() {
  const io = makeFileSystemIO();

  return new FSPersister(io);
}
