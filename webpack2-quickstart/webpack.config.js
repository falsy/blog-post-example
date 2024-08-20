'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function makeWebpackConfig() {
  var config = {};
  
  config.entry = {
    app: './index.js',
  };

  config.output = {
    path: __dirname + '/build',
    filename: 'cheolguso.bundle.js'
  };

  config.devtool = 'eval-source-map';

  config.module = {};

  config.plugins = [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body'
    })
  ];

  return config;
}();