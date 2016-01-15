const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/client',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.md', '.txt'],
  },
  module: {
    loaders: [
      { test: /\.js[x]?$/, include: path.join(__dirname, 'src'), loader: 'babel-loader' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap') },
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
};
