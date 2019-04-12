const merge = require('webpack-merge'),
      path = require('path'),
      common = require('./webpack.common.js'),
      webpack = require('webpack'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      BundleTracker = require('webpack-bundle-tracker');

module.exports = merge(common, {
  entry: {
    main: [
      path.join(__dirname, '../src/index')
    ],
  },
  output: {
    path: path.join(__dirname, '../builds/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/assets/'
  },
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, '../builds/*/**')]
    }),
    new BundleTracker({ filename: './frontend/webpack/webpack-stats.production.json' }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BASE_URL: JSON.stringify('http://0.0.0.0/'),
      }
    }),
  ],
});