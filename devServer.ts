import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import webpackConfig from './webpack.config.js';
const clientConfig = webpackConfig.find(config => config.name === 'client');

const compiler = webpack(webpackConfig as any[]);
const clientCompiler = compiler.compilers.find(
    compiler => compiler.name === 'client'
);

const app = express();
const PORT = 3000;

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: clientConfig.output.publicPath,
        serverSideRender: true,
        index: false,
    })
);

app.use(webpackHotMiddleware(clientCompiler));

app.use(webpackHotServerMiddleware(compiler as any));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
