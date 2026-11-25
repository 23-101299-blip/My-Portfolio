const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      publicPath: '/',
      clean: true,
    },
    resolve: { extensions: ['.js', '.jsx'] },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './public/index.html', favicon: './public/favicon.svg' }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public/assets', to: 'assets' },
          { from: 'public/_redirects', to: '.' },
          { from: 'public/.htaccess', to: '.', toType: 'dir' },
        ],
      }),
      isProd && new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash:8].css' }),
    ].filter(Boolean),
    devServer: {
      static: { directory: path.resolve(__dirname, 'public') },
      historyApiFallback: true,
      port: 3000,
      open: false,
      hot: true,
    },
    devtool: isProd ? false : 'eval-cheap-module-source-map',
    performance: { hints: false },
  };
};
