import electron from 'electron';
import { Application } from 'spectron';

const beforeEach = function () {
  this.timeout(10000);

  this.app = new Application({
    path: electron,
    args: ['.'],
    chromeDriverArgs: ['remote-debugging-port=9222'],
  });
  return this.app.start();
};

const afterEach = function () {
  this.timeout(10000);

  if (this.app && this.app.isRunning()) {
    return this.app.stop();
  }
  return undefined;
};

export default {
  beforeEach,
  afterEach,
};
