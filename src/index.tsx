import React from 'react';
import { hydrate } from 'react-dom';

import App from './App';

const rootElement = document.querySelector('#root');

function hydrateEntireTree(Component: typeof App) {
    hydrate(<Component />, rootElement);
}

hydrateEntireTree(App);

if ((module as any).hot) {
    (module as any).hot.accept('./App', () => {
        const NextApp = require('./App').default;
        hydrateEntireTree(NextApp);
    });
}
