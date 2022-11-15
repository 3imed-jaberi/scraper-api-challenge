import fs from 'node:fs';
import path from 'node:path';

import { BaseProxyCredential, IFileSystemIO } from './fs-io.types';

export class FileSystemIO<ProxyCredential extends BaseProxyCredential>
  implements IFileSystemIO<ProxyCredential>
{
  _getBasePath(): string {
    const basePath = path.resolve(process.cwd(), 'database');
    return basePath;
  }

  _getFilePath(): string {
    const storePath = path.resolve(this._getBasePath(), 'store.json');
    return storePath;
  }

  _withSafeFile() {
    const basePath = this._getBasePath();
    /* c8 ignore next */
    if (!fs.existsSync(basePath)) fs.mkdirSync(basePath);
    const storePath = this._getFilePath();
    /* c8 ignore next */
    if (!fs.existsSync(storePath)) fs.writeFileSync(storePath, '');
  }

  read(): Record<'proxies', ProxyCredential[]> {
    this._withSafeFile();
    const storeContent = fs.readFileSync(this._getFilePath(), 'utf8');
    return JSON.parse(storeContent);
  }

  write(content: Record<string, unknown>) {
    this._withSafeFile();
    fs.writeFileSync(this._getFilePath(), JSON.stringify(content));
  }
}
