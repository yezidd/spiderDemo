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
    contentBase: './dist',
    port: "5000",
    hot: true,
    proxy: {
      '*': {
        target: 'http://[::1]:3000/api/v1',
        secure: false,
        changeOrigin: true
      }
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