const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const postCssFlexbugsFixesPlugin = require('postcss-flexbugs-fixes');

const res = p => path.resolve(__dirname, p);

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
    .readdirSync(res('../node_modules'))
    .filter(x => !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/.test(x))
    .reduce((externalsAcc, mod) => {
        externalsAcc[mod] = `commonjs ${mod}`;
        return externalsAcc;
    }, {});

module.exports = {
    name: 'server',
    target: 'node',
    devtool: 'source-map',
    entry: ['fetch-everywhere', res('../src/universal/render.jsx')],
    externals,
    output: {
        path: res('../buildServer'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
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
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'css-loader/locals',
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
                            ident: 'postcss',
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
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],
};
