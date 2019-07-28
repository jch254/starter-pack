import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import * as path from 'path';
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import * as webpack from 'webpack';
import * as WebpackChunkHash from 'webpack-chunk-hash';
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const config: webpack.Configuration = {
  mode: 'production',
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
        AUTH0_CLIENT_ID: JSON.stringify(process.env.AUTH0_CLIENT_ID),
        AUTH0_DOMAIN: JSON.stringify(process.env.AUTH0_DOMAIN),
        GA_ID: JSON.stringify(process.env.GA_ID),
      },
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Starter Pack | 603.nz',
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
    new InlineManifestWebpackPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
        canPrint: false,
      }),
      new UglifyJsPlugin({
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      cacheGroups: {
        auth0: {
          test: /[\\/]node_modules[\\/](auth0-js|auth0-lock|auth-password-policies)[\\/]/,
          name: 'auth0',
        },
        utilities: {
          test: /[\\/]node_modules[\\/](immutable|moment|react|react-dom|react-loading)[\\/]/,
          name: 'utilities',
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
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
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
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

export default config;
