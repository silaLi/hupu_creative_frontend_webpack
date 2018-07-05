let utils = require("./lib/util");
let CleanWebpackPlugin = require('clean-webpack-plugin');
let base = require("./webpack.base.js");
let ips = utils.getIps();

module.exports = {
  entry: {
    index: "./front-src/index.test.js",
  },
  ...base,
  output: {
    // path: __dirname + "/dist/deploy/", // 输出文件的保存路径
    path: "/Users/liyang/Downloads/test/",
    filename: "[name].entry.js", // 输出文件的名称
    publicPath: "./deploy/",
  },
  devtool: '#source-map',
  devServer: {
    contentBase: "dist",
    compress: true,
    inline: true,
    open: true,
    port: 8080,
    allowedHosts: [
      "local.vipabc.com",
      "local.vipjr.com",
    ],
    host: ips[0] || "0.0.0.0",
    publicPath: "/deploy",
    // historyApiFallback: true,
    // proxy: {
    //   context: ["/ajax/sms_authcode", "/xbox/ajax"],
    //   target: "http://realmadrid.hupu.com",
    // },
  },
  plugins: [
    ...base.plugins,
    // new CleanWebpackPlugin([__dirname+"/dist/"], {
    //   root: '', // An absolute path for the root  of webpack.config.js
    //   verbose: true, // Write logs to console.
    //   dry: false, // Do not delete anything, good for testing.
    // }),
  ],
}
