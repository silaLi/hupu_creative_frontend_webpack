var ToolsContainer = require('./tools/tools.config.js');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path')

module.exports = {
  entry: {
    // index: './front-src/entry/index.ts',
    index: path.resolve(__dirname + '/./front-src/entry/index.test.ts'),
  },
  output: {
    path: path.resolve(__dirname + '/./dest/deploy/'), // 输出文件的保存路径
    filename: '[name].entry.js' // 输出文件的名称
  },
  module: {
    loaders: [{
      test: /\.(js)$/,
      exclude: /node_modules/,
      use: [
        "babel-loader?presets[]=es2015",
        "eslint-loader",
      ]
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
    }, {
      test: /\.art$/,
      loader: "art-template-loader",
      options: {
        // art-template options (if necessary)
        // @see https://github.com/aui/art-template
      }
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname + '/./dest/deploy/')], {
      root: '', // An absolute path for the root  of webpack.config.js
      verbose: true, // Write logs to console.
      dry: false // Do not delete anything, good for testing.
    })
  ],
  externals: {

  }
}

var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static('dest'));
var server = app.listen(3000, function () {
  console.log('Listening on port %d', server.address().port);
});