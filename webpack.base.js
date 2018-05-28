var webpack = require("webpack");


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
      test: /\.(scss|sass)$/,
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
        loader: "sass-loader",
        options: {
          
        }
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