const merge = require('webpack-merge'),
      path = require('path'),
      common = require('./webpack.common.js'),
      BundleTracker = require('webpack-bundle-tracker'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      webpack = require('webpack');

const isDevServer = path.basename(require.main.filename) === 'webpack-dev-server.js';

const config = merge(common, {
  entry: {
    main: [
      path.join(__dirname, '../src/index')
    ],
  },
  output: {
    path: path.join(__dirname, '../builds-dev/'),
    filename: '[name]-[hash].js',
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    inline: true,
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3000,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, '../builds-dev/**/*')]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new BundleTracker({ filename: './frontend/webpack/webpack-stats.dev.json' }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BASE_URL: JSON.stringify('http://0.0.0.0:8000/'),
      }
    })
  ]
});

if (isDevServer) {
  config.entry.main = [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '../src/index')
  ]
  config.output.publicPath = 'http://0.0.0.0:3000/assets/';
}

module.exports = config
