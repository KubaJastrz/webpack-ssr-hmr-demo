Server side rendering with HMR enabled using Webpack + Typescript.

### Usage

To run dev server:

```bash
yarn server-watch   # watches express server for changes (necessary for HMR on server-side)
yarn start          # runs dev server with client HMR enabled
```

Server will be live at http://localhost:3000. You can now edit `src/App.tsx` and
changes should appear automatically. After page refresh, applied changes should
remain visible (view the page source).

### How it works

Node serves regular express instance with webpack dev and hot middlewares.
That, combined with `module.hot.accept` in `src/index.tsx`, provides HMR for client side.
But there is one issue here. If you refresh the page, you'll see that client bundle
renders correct updated information, but server responds with outdated html markup.
To fix that I've used node HMR (https://github.com/minimal-xyz/minimal-webpack-nodejs-hmr).

In SSR it uses [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)
for automatic script injection. You can see more in `src/requestHandler.tsx`.
