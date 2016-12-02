# tdd-tutorial

Initial Setup

1. `git init`
2. `npm init`
3. `npm i --save-dev webpack` & `npm install webpack-dev-server` see [here](http://survivejs.com/webpack/developing-with-webpack/getting-started/) and [here](https://webpack.github.io/docs/webpack-dev-server.html)
4. Add `webpack.config.js`:

  ```js
    module.exports = {
    context: __dirname + "/app",
    entry: "./index",
    output: {
      path: __dirname + "/dist",
      filename: "app.bundle.js"
    },
    module: {
      loaders: [

      ]
    }
  };
  ```

5. Add app folder with index.js + configure package.json with `build:webpack`
6. Add babel
    ```js
    npm install babel-loader babel-core babel-preset-es2015 --save-dev
    ```

    update `webpack.conf.js`:

    ```js
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
    ```

7. Install React:

   ```js
   npm i --save react react-dom
   ```  

10. add `index.html` (for now inside dist, a loader will be added later)

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <body>
    <script src="assets/app.bundle.js"></script>
  </body>
  </html>
  ```

11. Setup browser test env:


  ```js
  npm i --save-dev chromedriver@latest
  ```

  ```js
  npm i --save-dev mocha chai babel-register
  ```

  Add first browser test, inside test/browser/app.browser.js:

  ```js
import {expect} from 'chai';
import webdriver from 'selenium-webdriver';
import path from 'path';

const By = webdriver.By;
const until = webdriver.until;

const chromeDriverPathAddition = `:${path.dirname(require('chromedriver').path)}`;
process.env.PATH += chromeDriverPathAddition;

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

afterEach(() => {
  driver.quit();
});

describe('App', () => {
  it('page is loaded', async () => {
    driver.get('http:localhost:3000');
    driver.wait(until.elementLocated(By.id('title')), 10000, 'Could not locate the child element within the time specified');
    const elemenValue = await driver.findElement(By.id('title')).getAttribute('innerText');
    expect(elemenValue).to.equal('123');
  });
});
  ```


install babel "stage-0" and babel-polyfill, for async await:

```js
npm install --save-dev babel-preset-stage-0
npm install --save-dev babel-polyfill
```

Add `.babelrc`:

```json
{
  "presets": ["es2015", "stage-0"]
}
```


```js
"test:browser": "mocha ./test/**/*.browser.js --compilers js:babel-core/register --require babel-polyfill",
```


Add a simple express server to server statics:

```js
npm i --save-dev express
```

test/browser/server.js:

```js

const express = require('express');

var app = express();

app.use(express.static('dist'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});


```

in package.json:

`mocha ./test/**/*.browser.js --compilers js:babel-core/register --require babel-polyfill --require test/browser/server`
