var ToolsContainer = require('./tools.config.js');

var CleanWebpackPlugin = require('clean-webpack-plugin');
var SftpWebpackPlugin = require('sftp-webpack-plugin')

var webpack_config = {
    entry: {
        index: 'front-src/style/entry/index.js'
    },
    output: {
        path: __dirname + '/dest/deploy/', // 输出文件的保存路径
        filename: '[name].entry.js' // 输出文件的名称
    },
    module: {
        loaders: [{
            test: /\.(js)$/,
            loaders: 'es3ify-loader!babel-loader?presets[]=es2015-loose'
        }, {
            test: /\.(scss|sass)$/,
            loaders: 'style-loader!css-loader!postcss-loader!sass-loader'
        }, {
            test: /\.(png|jpg)$/,
            loaders: ToolsContainer.getDependencies('urlPathLoader')
                // loaders: 'file-loader'
        }, {
            test: /\.html$/,
            loaders: 'html-loader'
        }]
    },
    plugins: [
        new CleanWebpackPlugin([__dirname + '/dest/deploy/'], {
            root: '', // An absolute path for the root  of webpack.config.js
            verbose: true, // Write logs to console.
            dry: false // Do not delete anything, good for testing.
        })
    ]
}

process.argv.forEach((argv) => {
    if (argv === '-p') {
        deploy();
    }
})
function deploy() {
    webpack_config.plugins.push(new SftpWebpackPlugin({
        port: '5277',
        host: '192.168.9.78',
        username: '',
        password: '',
        from: __dirname + '/dest/deploy/',
        to: ''
    }))
}

module.exports = webpack_config;