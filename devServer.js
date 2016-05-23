import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import express from 'express';
import path from 'path';
import http from 'http';
import webpackConfig from './webpack.config';

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
    modules: false
  }
}));

app.use(webpackHotMiddleware(compiler));

// This is necessary to handle URL correctly since client uses Browser History
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '', './dist/index.html'))
})

app.listen(WEBPACK_PORT, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('WebpackDevServer listening at localhost:' + WEBPACK_PORT);
});

const server = http.createServer(app);
