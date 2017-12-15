if(process.env.NODE_ENV == 'development'){
    module.exports = require('./config/webpack.config.dev.js');
}else if(process.env.NODE_ENV == 'depley'){
    module.exports = require('./config/webpack.config.deploy.js');
}else if(process.env.NODE_ENV == 'release'){
    module.exports = require('./config/webpack.config.release.js');
}