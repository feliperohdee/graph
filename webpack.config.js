const path = require('path');
const webpack = require('webpack');

module.exports = {
    cache: true,
    debug: true,
    verbose: true,
    devtool: 'source-map',
    entry: {
        vendor: ['./src/client/vendor.js'],
        bundle: ['./src/client/index.jsx']
    },
    output: {
        path: 'public/js',
        publicPath: 'public/js',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel'
        }],
        noParse: [
            /\.min\.js/
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'common.js',
            chunks: ['vendor', 'bundle']
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),
        new webpack.optimize.DedupePlugin()
    ]
};
