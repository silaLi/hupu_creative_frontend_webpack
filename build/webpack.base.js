let path = require("path");
let _dirname = path.resolve(__dirname, "./");
let _context = path.resolve(__dirname, "../");

let CleanWebpackPlugin = require("clean-webpack-plugin");
let HtmlWebpackPlugin = require("Html-webpack-plugin");
let CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  context: _context,
  entry: {
    fan: _context + "/front-src/entries/Fan/index.js",
    notfan: _context + "/front-src/entries/NotFan/index.js",
  },
  output: {
    path: _context + "/dist/",
    filename: "[name].entry.js",
    publicPath: "",
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
        options: {
          config: {
            path: _dirname
          }
        }
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
        options: {
          config: {
            path: _dirname
          }
        }
      }, {
        loader: _dirname + "/customize-loader/rpx-loader.js",
        options: {
          psdQuery: 750,
          unitQuery: "rpx",
          numFixed: 4,
        },
      }, {
        loader: "less-loader",
        options: {}
      }]
    }, {
      test: /\.(png|jpg|jpeg|gif|txt|mp3|wav)$/,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 1024
          }
        }
      ]
    }, {
      test: /\.html$/,
      use: [
        {
          loader: "html-loader",
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
    wx: "wx"
  },
  plugins: [
    new CleanWebpackPlugin([_context + "/dist/**/*"], {
      root: _context, // An absolute path for the root  of webpack.config.js
      verbose: true, // Write logs to console.
      dry: false, // Do not delete anything, good for testing.
    }),
    new HtmlWebpackPlugin({
      title: "球迷版",
      chunks: ["fan"],
      hash: true,
      filename: "fan.html",
      template: _context + "/front-src/routes-entry-html/index.html",
    }),
    new HtmlWebpackPlugin({
      title: "非球迷版",
      chunks: ["notfan"],
      hash: true,
      filename: "index.html",
      template: _context + "/front-src/routes-entry-html/index.html",
    })
  ],
}