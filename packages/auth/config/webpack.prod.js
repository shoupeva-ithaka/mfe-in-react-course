const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packagejson = require('../package.json');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/auth/latest/' // specifies location of marketing files
  },
  plugins: [
    new ModuleFederationPlugin({
        name: 'auth',
        filename: 'remoteEntry.js',
        exposes: {
          './AuthApp': './src/bootstrap'
        },
        shared: packagejson.dependencies
    })
  ]
}

module.exports = merge(commonConfig, prodConfig);