import React from 'react';
import { renderToString } from 'react-dom/server';

import App from './App';

const rawRender = (Component: typeof App) => () =>
    renderToString(<Component />);

// webpack and node malforms module exports, so if we want to dynamically
// update something, it needs to be wrapped in an object
const toExport = {
    renderEntireTree: rawRender(App),
};

if ((module as any).hot) {
    (module as any).hot.accept('./App', () => {
        const NextApp = require('./App').default;
        toExport.renderEntireTree = rawRender(NextApp);
        console.log('updated tree', toExport.renderEntireTree());
    });
}

export default toExport;
