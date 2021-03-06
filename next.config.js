const withCSS = require('@zeit/next-css');
const svgoConfig = require('./common/config/svgo');

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    // No need for importLoaders: 1 as its set to 1 when postcss.config.js exists
    localIdentName: '[name]_[local]__[hash:base64:5]',
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    // eslint-disable-next-line no-param-reassign
    config.node = { fs: 'empty' };

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'react-svg-loader',
          options: {
            svgo: svgoConfig,
          },
        },
      ],
    });

    return config;
  },
});
