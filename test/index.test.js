const { Builder, Browser, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Index Page Tests', function() {
  let driver;
  const url = process.env.URL || 'https://danwakeem.github.io';

  this.timeout(10000);

  beforeEach(async function() {
    const options = new chrome.Options();
    options.addArguments('--headless');
    
    driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(options)
      .build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  it('should have title "Hello World"', async function() {
    await driver.get(url);
    const title = await driver.getTitle();
    assert.strictEqual(title, 'Hello World');
    // await driver.sleep(3000); // Wait for 3 seconds
  });

  it('should calculate 20% of input value', async function() {
    await driver.get(url);
    
    const input = await driver.findElement(By.id('numberInput'));
    await input.sendKeys('50');
    
    const result = await driver.findElement(By.id('result'));
    const resultText = await result.getText();
    
    assert.strictEqual(resultText, '10');
    // await driver.sleep(3000); // Wait for 3 seconds
  });
});
