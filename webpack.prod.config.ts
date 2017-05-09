import path = require('path');

import webpack = require('webpack');
import ExtractTextPlugin = require('extract-text-webpack-plugin');
import OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');
import WebpackChunkHash = require('webpack-chunk-hash');

// TODO: Add to @types/webpack
declare module 'webpack' {
  class HashedModuleIdsPlugin extends Plugin {
    constructor();
  }
}

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
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module: any) => module.context && module.context.indexOf('node_modules') !== -1,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ExtractTextPlugin({ 
      filename: 'assets/[name].[contenthash].css',
      allChunks: true,
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: {removeAll: true } },
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
        use: ['awesome-typescript-loader'],
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

export default config;
