let utils = require("./lib/util");
let CleanWebpackPlugin = require('clean-webpack-plugin');
let base = require("./webpack.base.js");
let ips = utils.getIps();

module.exports = {
  entry: {
    index: "./front-src/entries/index/index.test.js",
  },
  ...base,
  output: {
    path: __dirname + "/dist/deploy/", // 输出文件的保存路径
    filename: "[name].entry.js", // 输出文件的名称
    publicPath: "./deploy/",
  },
  devtool: '#source-map',
  devServer: {
    contentBase: "dist",
    compress: true,
    inline: true,
    open: true,
    port: 8070,
    allowedHosts: [
      "local.vipabc.com",
      "local.vipjr.com",
      "dev.vipjr.com",
      "stagelp.vipjr.com",
    ],
    host: "0.0.0.0",
    publicPath: "/deploy",
    // historyApiFallback: true,
    // proxy: {
    //   context: ["/ajax/sms_authcode", "/xbox/ajax"],
    //   target: "http://realmadrid.hupu.com",
    // },
  },
  plugins: [
    ...base.plugins,
  ],
}
