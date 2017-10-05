const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const postCssFlexbugsFixesPlugin = require('postcss-flexbugs-fixes');

module.exports = {
    name: 'test',
    target: 'web',
    devtool: 'inline-source-map',
    // devtool: 'eval-source-map',
    entry: ['babel-polyfill', 'fetch-everywhere', path.resolve(__dirname, '../sauce/app/index.jsx')],
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
                use: [
                    {
                        loader: 'style-loader',
                    },
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
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],
};
