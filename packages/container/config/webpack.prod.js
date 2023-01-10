const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packagejson = require('../package.json');

// gets our domain from our CI/CD Pipeline environment variable
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/' // specifies location of container files 
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js` // assuming the marketing project will be nested inside a folder at this domain
      },
      shared: packagejson.dependencies
    })
  ]
}

module.exports = merge(commonConfig, prodConfig);
