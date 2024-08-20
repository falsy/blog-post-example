const webpack = require('webpack');
const HTMLWeebPackPlugin = require("html-webpack-plugin");
const dotenv = require('dotenv');

module.exports = (env, options) => {

  dotenv.config({
    path: `./env/${options.stage || 'server'}.env`
  });

  return {
    plugins: [
      new HTMLWeebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(process.env.API_URL)
      }),
      new webpack.EnvironmentPlugin(['API_URL'])
    ]
  };
};