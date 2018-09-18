var autoprefixer = require('autoprefixer');
var cssnano = require("cssnano");
return[
  autoprefixer({
    // browsers: ["IE > 9", "Opera > 11", "Firefox > 14", "safari > 5", "Chrome > 30"]
    browsers: ['> 2%', 'iOS >= 8']
  }),
  cssnano(),
]