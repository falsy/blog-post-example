const { resolve } = require('path');
const HTMLWeebPackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    path: resolve(__dirname, 'src/dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HTMLWeebPackPlugin({
      template: resolve(__dirname, 'src/index.html'),
      filename: './index.html'
    })
  ]
};