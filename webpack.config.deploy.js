var ToolsContainer = require('./tools/tools.config.js');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path')

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
    }
}
