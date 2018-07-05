
var SftpWebpackPlugin = require('sftp-webpack-plugin');
var base = require("./webpack.base.js");


var private_config = './private_config/private.config.json'
private_config = require(private_config);

const config = {
  ...base,
  mode: "production",
  entry: {
    index: "./front-src/index.js",
  },
  output: {
    path: __dirname + "/dist/deploy/", // 输出文件的保存路径
    filename: "[name].entry.js", // 输出文件的名称
    publicPath: "./deploy/",
  },
  plugins: [
    ...base.plugins,
    new CleanWebpackPlugin([__dirname+"/dist/"], {
      verbose: true, // Write logs to console.
      dry: false, // Do not delete anything, good for testing.
      allowExternal: true,
    }),
  ],
}
if(private_config.SftpWebpackPlugin.open){
  config.plugins.push(
    new SftpWebpackPlugin({
      port: private_config.SftpWebpackPlugin.port,
      host: private_config.SftpWebpackPlugin.host,
      username: private_config.SftpWebpackPlugin.username,
      password: private_config.SftpWebpackPlugin.password,
      from: "./dist/deploy/",
      to: private_config.SftpWebpackPlugin.to
    })
  )
}

module.exports = config;