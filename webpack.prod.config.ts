import path = require('path');

import ExtractTextPlugin = require('extract-text-webpack-plugin');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');
import OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
import webpack = require('webpack');
import WebpackChunkHash = require('webpack-chunk-hash');

const config: webpack.Configuration = {
  entry: [
    path.join(__dirname, 'src', 'index.tsx'),
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
        AUTH0_CLIENT_ID: JSON.stringify(process.env.AUTH0_CLIENT_ID),
        AUTH0_DOMAIN: JSON.stringify(process.env.AUTH0_DOMAIN),
        GA_ID: JSON.stringify(process.env.GA_ID),
      },
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module: any) => module.context && module.context.indexOf('node_modules') !== -1,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      chunks: ['vendor'],
      name: 'auth0',
      minChunks: (module: any) => module.resource && (/auth0/).test(module.resource),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      chunks: ['vendor'],
      name: 'react-loading',
      minChunks: (module: any) => module.resource && (/react-loading/).test(module.resource),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common',
      minChunks: (module: any, count: number) => count >= 2,
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
      favicon:  path.join(__dirname, 'src', 'favicon.ico'),
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
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.json'],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          emitErrors: true,
          failOnHint: true,
        },
      },
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, 'src'),
        use: [{
          loader: 'awesome-typescript-loader',
          options: {
            silent: true,
          },
        }],
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

export default config;
