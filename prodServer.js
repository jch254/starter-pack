import path from 'path';
import http from 'http';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';

import webpackConfig from './webpack.prod.config.babel';

const app = express();
const WEBPACK_PORT = 3001;
const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
}));

app.use(webpackHotMiddleware(compiler));

app.get('/favicon.png', (request, response) => response.sendFile(path.resolve(__dirname, 'dist/favicon.png')));
app.get('/styles.css', (request, response) => response.sendFile(path.resolve(__dirname, 'dist/styles.css')));
app.get('/bundle.js', (request, response) => response.sendFile(path.resolve(__dirname, 'dist/bundle.js')));

// This is necessary to handle URL correctly since client uses Browser History
app.get('*', (request, response) => response.sendFile(path.resolve(__dirname, 'dist/index.html')));

app.listen(WEBPACK_PORT, process.env.PROD_SERVER_HOST || 'localhost', (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`WebpackProdServer listening at localhost:${WEBPACK_PORT}`);
});

http.createServer(app);
