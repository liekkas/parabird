const path = require('path');
const webpack = require('webpack');
const ejs = require('ejs');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/client'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.md', '.txt'],
  },
  module: {
    loaders: [
      { test: /\.js[x]?$/, include: path.join(__dirname, 'src'), loader: 'babel-loader' },
      { test: /\.scss$/, loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap' },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('css?sourceMap&-minimize!' + 'autoprefixer-loader!' + 'less?sourceMap') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap&-minimize!' + 'autoprefixer-loader') },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
  ],
};
