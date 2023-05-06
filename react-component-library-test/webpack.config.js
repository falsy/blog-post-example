const path = require("path");
const HTMLWeebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/index.tsx'],
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
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
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      react: path.resolve('./node_modules/react'),
    }
  },
  plugins: [
    new HTMLWeebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};