let path = require("path");
let _dirname = path.resolve(__dirname, "./");
let _context = path.resolve(__dirname, "../");

let utils = require("./lib/util");
let base = require("./webpack.base.js");
let ips = utils.getIps();
console.log(ips);

module.exports = {
  ...base,
  entry: {
    ...base.entry,
    fan: _context + "/front-src/entries/Fan/index.test.js",
    notfan: _context + "/front-src/entries/NotFan/index.test.js",
  },
  devtool: '#source-map',
  watchOptions: {
    ignored: /node_modules/, 
    aggregateTimeout: 300,
    poll: 1000
  },
  devServer: {
    contentBase: "dist",
    compress: true,
    inline: true,
    port: 8094,
    allowedHosts: [
      "local.vipabc.com",
      "local.vipjr.com",
      "dev.vipjr.com",
      "stagelp.vipjr.com",
    ],
    host: "0.0.0.0",
    publicPath: "",
    before(app){
      app.get('/log', function(req, res) {
        console.log(req.originalUrl)
        res.json({ custom: 'response' });
      });
    }
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
