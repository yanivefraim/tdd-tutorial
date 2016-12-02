const path = require('path');

module.exports = {
  context: __dirname + "/app",
  entry: "./index",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/assets/",
    filename: "app.bundle.js"
  },
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
};
