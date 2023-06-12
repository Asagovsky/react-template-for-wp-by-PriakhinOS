const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require('path');

module.exports = {
  ...defaultConfig,
  resolve: {
    ...defaultConfig.resolve,
    alias: {
      ...defaultConfig.resolve.alias,
      'public': path.resolve(__dirname, 'public'),
      'components': path.resolve(__dirname, 'src/components'),
      'assets': path.resolve(__dirname, 'src/assets'),
      'helpers': path.resolve(__dirname, 'src/helpers'),
      'hooks': path.resolve(__dirname, 'src/hooks')
    }
  },
  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.svg$/,
        issuer: /\.(pc|sc|sa|c)ss$/,
        type: 'asset/resource',
      }
    ]
  }
};