var CleanWebpackPlugin = require('clean-webpack-plugin');
var base = require("./webpack.base.js");
var ip = getIPAdress();

module.exports = {
  entry: {
    index: "./front-src/index.test.js",
  },
  ...base,
  output: {
    path: __dirname + "/dist/deploy/", // 输出文件的保存路径
    filename: "[name].entry.js", // 输出文件的名称
    publicPath: "/deploy/",
  },
  devtool: '#source-map',
  devServer: {
    contentBase: "dist",
    compress: true,
    inline: true,
    open: true,
    port: 8080,
    host: ip || "0.0.0.0",
    publicPath: "/deploy",
    // historyApiFallback: true,
    // proxy: {
    //   context: ["/ajax/sms_authcode", "/xbox/ajax"],
    //   target: "http://realmadrid.hupu.com",
    // },
  },
  plugins: [
    ...base.plugins,
    new CleanWebpackPlugin([__dirname + "/dist/deploy/"], {
      root: '', // An absolute path for the root  of webpack.config.js
      verbose: true, // Write logs to console.
      dry: false // Do not delete anything, good for testing.
    })
  ],
}


function getIPAdress() {
  var hasLocalHost = false;
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if(alias.family === 'IPv4' && alias.address === '127.0.0.1'){
        hasLocalHost = true
      }
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
  if(hasLocalHost === true){
    return "127.0.0.1"
  }
} 