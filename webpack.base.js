var webpack = require("webpack");
let path = require("path");

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
      test: /\.(ts)$/,
      loaders: "ts-loader"
    }, {
      test: /\.(css)$/,
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
          psd: 640,
          unit: "rpx",
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
    alias: {
      "zepto": __dirname+ "/front-src/assets/zepto-verdor"
    }
  },
  plugins: [
    
  ],
}