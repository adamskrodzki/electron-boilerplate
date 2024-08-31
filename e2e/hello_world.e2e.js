import { expect } from 'chai';
import testUtils from './utils.js';

describe('application launch', function () {
  this.timeout(60000); // Increased timeout

  beforeEach(function (done) {
    testUtils.beforeEach
      .call(this)
      .then(() => done())
      .catch((error) => {
        console.error('Error in beforeEach:', error);
        done(error);
      });
  });

  afterEach(testUtils.afterEach);

  it('shows hello world text on screen after launch', async function () {
    try {
      console.log('Waiting for window to load...');
      await this.app.client.waitUntilWindowLoaded();
      console.log('Window loaded.');

      console.log('Getting window count...');
      const count = await this.app.client.getWindowCount();
      console.log(`Window count: ${count}`);

      console.log('Trying to find #greet element...');
      const element = await this.app.client.$('#greet');
      console.log('Element found, waiting for it to exist...');
      await element.waitForExist({ timeout: 15000 });
      console.log('Element exists, getting text...');
      const text = await element.getText();
      console.log(`Element text: ${text}`);
      expect(text).to.equal('Hello World!');
    } catch (error) {
      console.error('Test failed with error:', error);
      throw error;
    }
  });
});
