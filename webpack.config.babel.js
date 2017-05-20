import path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InlineChunkManifestHtmlWebpackPlugin from 'inline-chunk-manifest-html-webpack-plugin';

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';

export default {
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    'webpack/hot/dev-server',
    `webpack-dev-server/client?http://${SERVER_HOSTNAME}:${SERVER_PORT}`,
    path.join(__dirname, 'src', 'index.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/[name].js',
    chunkFilename: 'assets/[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      chunks: ['vendor'],
      name: 'auth0',
      minChunks: module => module.resource && (/auth0/).test(module.resource),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      chunks: ['vendor'],
      name: 'react-loading',
      minChunks: module => module.resource && (/react-loading/).test(module.resource),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common',
      minChunks: (module, count) => count >= 2,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Starter Pack | 603.nu',
      template: path.join(__dirname, 'src', 'index.ejs'),
      favicon: path.join(__dirname, 'src', 'favicon.ico'),
      meta: [
        {
          name: 'description',
          content: 'React + Redux + Auth0',
        },
      ],
      minify: {
        collapseWhitespace: true,
      },
    }),
    new InlineChunkManifestHtmlWebpackPlugin({
      dropAsset: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css?$/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        include: path.join(__dirname, 'src'),
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
          },
        }],
      },
    ],
  },
};
