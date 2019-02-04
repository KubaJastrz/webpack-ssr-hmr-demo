const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    entry: ['./devServer.ts', 'webpack/hot/poll?1000'],
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'devServer.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    externals: [
        nodeExternals({
            whitelist: [/^webpack\/hot\/poll/],
        }),
    ],
};
