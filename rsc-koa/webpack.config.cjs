const path = require("path")

module.exports = {
  mode: "development",
  entry: "./src/client/client.js",
  output: {
    filename: "client.bundle.js",
    path: path.resolve(__dirname, "dist/client"),
    publicPath: "/client/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
}
