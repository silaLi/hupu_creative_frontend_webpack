
var base = require("./webpack.base.js");


const config = {
  ...base,
  mode: "production",
  entry: {
    index: "./front-src/entries/index/index.js",
  },
  output: {
    path: __dirname + "/dist/deploy/", // 输出文件的保存路径
    filename: "[name].entry.js", // 输出文件的名称
    publicPath: "./deploy/",
  },
  plugins: [
    ...base.plugins,
  ],
}

module.exports = config;