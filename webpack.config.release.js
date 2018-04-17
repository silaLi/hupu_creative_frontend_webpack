var CleanWebpackPlugin = require('clean-webpack-plugin');
var SftpWebpackPlugin = require('sftp-webpack-plugin');
var base = require("./webpack.base.js");


var private_config = './private_config/private.config.json'
private_config = require(private_config);

const config = {
  ...base,
  entry: {
    index: "./front-src/entry/index.js",
  },
  plugins: [
    ...base.plugins,
    new CleanWebpackPlugin([__dirname+"/dist/deploy/"], {
      root: '', // An absolute path for the root  of webpack.config.js
      verbose: true, // Write logs to console.
      dry: false // Do not delete anything, good for testing.
    })
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