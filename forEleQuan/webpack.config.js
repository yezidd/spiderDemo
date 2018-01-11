const path = require('path');

const webpack = require("webpack");

//webpack插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname + "/dist")
  },
  module: {
    rules: [
      {test: /\.txt$/, use: 'raw-loader'},
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },
      {test: /\.json/, use: "json-loader"},
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"}
        ]
      }
    ]
  },
  devServer: {
    port: "5000",
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api/v1/*': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
        // pathRewrite: {"^/": "/api/v1/"},
      },
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./dist/index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;