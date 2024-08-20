const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ['/node_modules'],
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.scss$/,
        exclude: ['/node_modules'],
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]

}