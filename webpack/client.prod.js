const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const vendorModules = require('./vendorModules');
const BabiliMinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
    name: 'client',
    target: 'web',
    devtool: 'source-map',
    entry: [
        'babel-polyfill',
        'fetch-everywhere',
        path.resolve(__dirname, '../src/index.jsx'),
    ],
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../buildClient'),
        publicPath: '/static/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ExtractCssChunks.extract({
                    use: {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                        },
                    },
                }),
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
    plugins: [
        new StatsPlugin('stats.json'),
        new ExtractCssChunks(),
        new webpack.optimize.CommonsChunkPlugin({
            // 'bootstrap' needed to put webpack bootstrap code before chunks
            names: ['bootstrap', 'vendor'],
            filename: '[name].[chunkhash].js',
            // put vendor modules listed in ./vendorModules.js into vendor.js
            minChunks: wpModule =>
                vendorModules.some(
                    vendorModule =>
                        wpModule.context &&
                        wpModule.context.includes(vendorModule),
                ),
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new BabiliMinifyPlugin(),
        // HashedModuleIdsPlugin not needed for strategy to work (just good practice)
        new webpack.HashedModuleIdsPlugin(),
    ],
};
