const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postCssFlexbugsFixesPlugin = require('postcss-flexbugs-fixes');
const vendorModules = require('./vendorModules');

module.exports = {
    name: 'client',
    target: 'web',
    // devtool: 'source-map',
    devtool: 'eval',
    entry: [
        'babel-polyfill',
        'fetch-everywhere',
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
        'react-hot-loader/patch',
        path.resolve(__dirname, '../src/index.jsx'),
    ],
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
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
        extensions: ['.js', '.jsx', '.css'],
    },
    plugins: [
        new WriteFilePlugin(), // used so you can see what chunks are produced in dev
        new ExtractCssChunks(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
            filename: '[name].js',
            minChunks: Infinity,
        }),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        new AutoDllPlugin({
            context: path.join(__dirname, '..'),
            filename: '[name].js',
            entry: {
                vendor: vendorModules,
            },
        }),
    ],
};
