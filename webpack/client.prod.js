const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postCssFlexbugsFixesPlugin = require('postcss-flexbugs-fixes');
const vendorModules = require('./vendorModules');
const BabiliMinifyPlugin = require('babel-minify-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    name: 'client',
    target: 'web',
    devtool: 'source-map',
    entry: ['babel-polyfill', 'fetch-everywhere', path.resolve(__dirname, '../src/app/index.jsx')],
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
                test: /\.scss$/,
                use: ExtractCssChunks.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                // Necessary for external CSS imports to work
                                // https://github.com/facebookincubator/create-react-app/issues/2677
                                // ident: 'postcss',
                                plugins: () => [
                                    postCssFlexbugsFixesPlugin,
                                    autoprefixer({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9', // React doesn't support IE8 anyway
                                        ],
                                        flexbox: 'no-2009',
                                    }),
                                ],
                            },
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                }),
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        // Need this plugin for deterministic hashing allows for vendor.js caching
        // until this issue is resolved: https://github.com/webpack/webpack/issues/1315
        // for more info: https://webpack.js.org/how-to/cache/
        new WebpackMd5Hash(),
        new StatsPlugin('stats.json'),
        new ExtractCssChunks(),
        new webpack.optimize.CommonsChunkPlugin({
            // 'bootstrap' needed to put webpack bootstrap code before chunks
            names: ['bootstrap', 'vendor'],
            filename: '[name].[chunkhash].js',
            // put vendor modules listed in ./vendorModules.js into vendor.js
            minChunks: wpModule =>
                vendorModules.some(vendorModule => wpModule.context && wpModule.context.includes(vendorModule)),
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new BabiliMinifyPlugin(),
    ],
};
