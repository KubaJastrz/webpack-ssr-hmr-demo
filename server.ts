import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from './webpack.config.js';

// tslint:disable-next-line no-var-requires
let requestHandler = require('./src/requestHandler').default;

const compiler = webpack(webpackConfig as any);

const app = express();
const PORT = 3000;

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        serverSideRender: true,
        index: false,
    })
);

app.use(
    webpackHotMiddleware(compiler, {
        reload: true,
    })
);

app.get('*', requestHandler);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

if ((module as any).hot) {
    (module as any).hot.accept('./src/requestHandler', () => {
        requestHandler = require('./src/requestHandler').default;
        console.log('updated requestHandler');
    });
}
