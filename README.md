Server side rendering with HMR enabled using Webpack + Typescript.

### Usage

To run dev server:

```bash
yarn start  # runs dev server with client and server HMR enabled
```

Server will be live at http://localhost:3000. You can now edit `src/components/App.tsx`
and changes should appear automatically. After page refresh, applied changes should
remain visible (view the page source).

### How it works

Node serves regular express instance with webpack dev and hot middlewares.
That, combined with `module.hot.accept` in `src/index.tsx`, provides HMR for client side.
For HMR in express server it uses [`webpack-hot-server-middleware`](https://github.com/60frames/webpack-hot-server-middleware).

In SSR it uses [`html-webpack-plugin`](https://github.com/jantimon/html-webpack-plugin)
for automatic script injection. You can see more in `src/requestHandler.tsx`.
