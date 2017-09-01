import path from 'path';

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InlineChunkManifestHtmlWebpackPlugin from 'inline-chunk-manifest-html-webpack-plugin';
import WebpackChunkHash from 'webpack-chunk-hash';

export default {
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'src', 'index.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/[name].[chunkhash].js',
    chunkFilename: 'assets/[name].[chunkhash].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
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
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ExtractTextPlugin({
      filename: 'assets/[name].[contenthash].css',
      allChunks: true,
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
      canPrint: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        }),
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
