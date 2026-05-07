import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import devConfig from './webpack.config';
import prodConfig from './webpack.prod.config';

const SERVER_PORT = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT as string, 10) : 3001;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';

const webpackConfig = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
const compiler = webpack(webpackConfig);

if (!compiler) {
  throw new Error('Webpack compiler could not be created');
}

const devServerOptions: WebpackDevServer.Configuration = {
  port: SERVER_PORT,
  host: SERVER_HOSTNAME,
  hot: process.env.NODE_ENV !== 'production',
  historyApiFallback: true,
};

const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log('Starting server...');
  await server.start();
  console.log(`Server listening at http://${SERVER_HOSTNAME}:${SERVER_PORT}`);
};

runServer();
