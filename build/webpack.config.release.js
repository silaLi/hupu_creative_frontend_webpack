let path = require("path");
let _dirname = path.resolve(__dirname, "./");
let _context = path.resolve(__dirname, "../");

var base = require(_dirname + "/webpack.base.js");

const config = {
  ...base,
  mode: "production",
  output: {
    ...base.output,
    publicPath: "/site/nfl_tune_in/"
  },
  plugins: [
    ...base.plugins,
  ],
}

module.exports = config;