if (process.env.NODE_ENV == 'development') {
  module.exports = require('./webpack.config.dev.js');
} else if (process.env.NODE_ENV == 'release') {
  module.exports = require('./webpack.config.release.js');
} else if (process.env.NODE_ENV == 'releasehp') {
  module.exports = require('./webpack.config.releasehp.js');
} else if (process.env.NODE_ENV == 'releaserel') {
  module.exports = require('./webpack.config.dev.js');
}