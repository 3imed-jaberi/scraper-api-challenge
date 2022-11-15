import { Application } from '../../../app';

import fs from 'node:fs';
import path from 'node:path';

export const createApp = () => Application.prepareEngine().listen();

const getScreenshotsPath = () => path.resolve(process.cwd(), 'screenshots');

const resetScreenshotsDirectory = () => {
  const screenshotsPath = getScreenshotsPath();
  if (!fs.existsSync(screenshotsPath)) fs.mkdirSync(screenshotsPath);
  const gitkeepPath = path.resolve(screenshotsPath, '.gitkeep');
  if (!fs.existsSync(gitkeepPath)) fs.writeFileSync(gitkeepPath, '');
};

export const getScreenshotsFiles = () =>
  fs.readdirSync(getScreenshotsPath()).filter((screenshot) => screenshot.split('.')[1] === 'png');

export const setup = () => {
  resetScreenshotsDirectory();
};

export const cleanup = () => {
  fs.rmSync(getScreenshotsPath(), { force: true, recursive: true });
  resetScreenshotsDirectory();
};
