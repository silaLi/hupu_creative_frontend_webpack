if (process.env.NODE_ENV == 'development') {
  module.exports = require('./webpack.config.dev.js');
} else if (process.env.NODE_ENV == 'depley') {
  module.exports = require('./webpack.config.deploy.js');
} else if (process.env.NODE_ENV == 'release') {
  module.exports = require('./webpack.config.release.js');
}else {
  module.exports = require('./webpack.config.dev.js');
}