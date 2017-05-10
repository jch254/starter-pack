import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import devConfig from './webpack.config.babel';
import prodConfig from './webpack.prod.config.babel';

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';

const webpackConfig = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

const compiler = webpack(webpackConfig);

const server = new WebpackDevServer(compiler, {
  publicPath: webpackConfig.output.publicPath,
  hot: process.env.NODE_ENV !== 'production',
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
});

server.listen(SERVER_PORT, SERVER_HOSTNAME, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Server listening at http://${SERVER_HOSTNAME}:${SERVER_PORT}`);
});
