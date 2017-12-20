var ToolsContainer = require('./tools/tools.config.js');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var SftpWebpackPlugin = require('sftp-webpack-plugin')
var path = require('path')

var private_config = './private_config/private.config.json'
private_config = require(private_config);

module.exports = {
    entry: {
        // index: './front-src/entry/index.ts',
        index: path.resolve(__dirname + '/./front-src/entry/index.ts'),
    },
    output: {
        path: path.resolve(__dirname + '/./dest/deploy/'), // 输出文件的保存路径
        filename: '[name].entry.js' // 输出文件的名称
    },
    module: {
        loaders: [{
            test: /\.(js)$/,
            loaders: 'babel-loader?presets[]=es2015'
        }, {
            test: /\.(ts)$/,
            loaders: 'ts-loader'
        // }, {    
        //     test: /\.(ts)$/,
        //     loaders: 'awesome-typescript-loader'
        }, {
            test: /\.(css)$/,
            loaders: 'style-loader!css-loader!postcss-loader'
        }, {
            test: /\.(scss|sass)$/,
            loaders: 'style-loader!css-loader!postcss-loader!sass-loader'
        }, {
            test: /\.(png|jpg|jpeg|txt)$/,
            loaders: ToolsContainer.getDependencies('urlPathLoader')
                // loaders: 'file-loader'
        }, {
            test: /\.html$/,
            loaders: 'html-loader'
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js' ]
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname + '/./dest/deploy/')], {
            root: '', // An absolute path for the root  of webpack.config.js
            verbose: true, // Write logs to console.
            dry: false // Do not delete anything, good for testing.
        }),
        new SftpWebpackPlugin({
            port: private_config.SftpWebpackPlugin.port,
            host: private_config.SftpWebpackPlugin.host,
            username: private_config.SftpWebpackPlugin.username,
            password: private_config.SftpWebpackPlugin.password,
            from: path.resolve(__dirname + '/./dest/deploy/'),
            to: private_config.SftpWebpackPlugin.to
        })
    ],
    externals: {

    }
}
