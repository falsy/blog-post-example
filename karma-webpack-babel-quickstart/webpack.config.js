const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      options: {
        presets: ['env']
      },
      exclude: ['/node_modules']
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};