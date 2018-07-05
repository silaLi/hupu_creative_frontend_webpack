let path = require("path");
let CleanWebpackPlugin = require('clean-webpack-plugin');
let HtmlWebpackPlugin = require("Html-webpack-plugin");

module.exports = {
  entry: {
    index: "./front-src/index.test.js",
  },
  mode: "development",
  module: {
    rules: [{
      test: /\.(js)$/,
      exclude: /node_modules/,
      use: [
        "eslint-loader",
        "babel-loader",
      ]
    }, {
      test: /\.(css)$/,
      use: [{
        loader: "style-loader",
      }, {
        loader: "css-loader",
      }, {
        loader: "postcss-loader",
      }]
    }, {
      test: /\.less$/,
      use: [{
        loader: "style-loader",
      }, {
        loader: "css-loader",
        options: {
          modules: true,
          "localIdentName": "[local]---[hash:base64:5]",
        }
      }, {
        loader: "postcss-loader",
      }, {
        loader: path.resolve(__dirname, "./customize-loader/rpx-loader.js"),
        options: {
          psdQuery: 750,
          unitQuery: "rpx",
          numFixed: 5,
        },
      }, {
        loader: "less-loader",
        options: {}
      }]
    }, {
      test: /\.(png|jpg|jpeg|txt|mp3|wav)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 1024
          }
        }
      ]
    }, {
      test: /\.html$/,
      use: [
        {
          loader: 'html-loader',
          options: {
            // 自定义css-mudole需要使用
            // lib/css-module-aisle.js
            removeAttributeQuotes: false
          }
        }
      ]
    }]
  },
  resolve: {
    extensions: [".js"],
  },
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "来vipJr学习的理由",
      chunks: ["index"],
      hash: true,
      filename: "../index.html",
      template: './front-src/routes-entry-html/index.html'
    })
  ],
}