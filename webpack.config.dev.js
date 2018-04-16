var CleanWebpackPlugin = require('clean-webpack-plugin');
var base = require("./webpack.base.js");

module.exports = {
  entry: {
    index: "./front-src/entry/index.test.js",
  },
  ...base,
  devtool: '#source-map',
  plugins: [
    ...base.plugins,
    new CleanWebpackPlugin([__dirname + "/dest/deploy/"], {
      root: '', // An absolute path for the root  of webpack.config.js
      verbose: true, // Write logs to console.
      dry: false // Do not delete anything, good for testing.
    })
  ],
}

var express = require('express');
var bodyParser = require('body-parser')
var app = express();



app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static('dest'));
var server = app.listen(8080, function () {
  const host = getIPAdress();
  const port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
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