var ToolsContainer = require("./tools/tools.config.js");
var webpack = require("webpack");

module.exports = {
  entry: {
    index: "./front-src/entry/index.test.js",
  },
  output: {
    path: __dirname + "/dest/deploy/", // 输出文件的保存路径
    filename: "[name].entry.js" // 输出文件的名称
  },
  module: {
    loaders: [{
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
      loaders: "style-loader!css-loader!postcss-loader"
    }, {
      test: /\.(scss|sass)$/,
      loaders: "style-loader!css-loader!postcss-loader!sass-loader"
    }, {
      test: /\.(png|jpg|jpeg|txt|mp3|wav)$/,
      loaders: ToolsContainer.getDependencies("urlPathLoader")
    }, {
      test: /\.html$/,
      loaders: "html-loader"
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