Server side rendering with HMR enabled using Webpack + Typescript.

### Run

```bash
yarn watch   # watches express server for changes
yarn start   # runs dev server with HMR enabled
```

### How it works

Node serves regular express instance with webpack dev and hot middlewares.
That, combined with `module.hot.accept` in `src/index.tsx`, provides HMR for client side.
But there is one issue here. If you refresh the page, you'll see that client bundle
renders correct updated information, but server responds with outdated html markup.

To fix that I've used node HMR (https://github.com/minimal-xyz/minimal-webpack-nodejs-hmr).
And that's why it needs 2 separate commands to work.
