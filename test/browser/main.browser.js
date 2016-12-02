import {expect} from 'chai';
import webdriver from 'selenium-webdriver';
import path from 'path';

const By = webdriver.By;
const until = webdriver.until;

const chromeDriverPathAddition = `:${path.dirname(require('chromedriver').path)}`;
process.env.PATH += chromeDriverPathAddition;
let driver;

if (process.env.SAUCE_USERNAME != undefined) {
  driver = new webdriver.Builder()
    .usingServer('http://'+ process.env.SAUCE_USERNAME+':'+process.env.SAUCE_ACCESS_KEY+'@ondemand.saucelabs.com:80/wd/hub')
    .withCapabilities({
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      build: process.env.TRAVIS_BUILD_NUMBER,
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      browserName: "chrome"
    }).build();
} else {
  driver = new webdriver.Builder()
    .withCapabilities({
      browserName: "chrome"
    })
  .build();
}

// const driver = new webdriver.Builder()
//   .forBrowser('chrome')
//   .build();

afterEach(() => {
  driver.quit();
});

describe('App', () => {
  it('page is loaded', done => {
    driver.get('http://www.google.com/ncr');
    driver.findElement(By.name('q')).sendKeys('webdriver');
    driver.findElement(By.name('btnG')).click();
    driver.wait(until.titleIs('webdriver - Google Search'), 15000).then(val => {
      expect(true).to.equal(true);
      done();
    });



    //
    // expect(results.indexOf('webdriver')).to.be.above(0);
    // done();
  });
});
