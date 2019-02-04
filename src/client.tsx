import React from 'react';
import { hydrate } from 'react-dom';

import App from './components/App';

const rootElement = document.querySelector('#root');

function hydrateEntireTree(Component: typeof App) {
    hydrate(<Component />, rootElement);
}

hydrateEntireTree(App);

if ((module as any).hot) {
    (module as any).hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        hydrateEntireTree(NextApp);
    });
}
