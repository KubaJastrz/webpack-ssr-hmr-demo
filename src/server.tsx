import React from 'react';
import { renderToString } from 'react-dom/server';

import App from './components/App';

const rawRender = (Component: typeof App) => () =>
    renderToString(<Component />);

// webpack and node malform module exports, so if we want to dynamically
// update something without re-importing, it needs to be wrapped in an object
const ServerRenderer = {
    renderEntireTree: rawRender(App),
};

if ((module as any).hot) {
    (module as any).hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        ServerRenderer.renderEntireTree = rawRender(NextApp);
    });
}

export default ServerRenderer;
