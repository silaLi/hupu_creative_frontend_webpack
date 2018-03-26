export default [{
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