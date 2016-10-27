import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/index.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: 'bundle.js',
    publicPath: '/js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      },
    }),
  ],
  resolve: {
    modulesDirectories: [
      'node_modules',
    ],
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
        loaders: [
          'transform-loader/cacheable?brfs',
          'transform-loader/cacheable?packageify',
        ],
      },
      {
        test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
        loader: 'transform-loader/cacheable?ejsify',
      },
      {
        test: /\.json?$/,
        loader: 'json',
      },
      {
        test: /\.css?$/,
        loader: 'style-loader!css-loader?modules',
        include: /src/,
      },
      { test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url',
        query: { limit: 10240 },
      },
    ],
  }
};
