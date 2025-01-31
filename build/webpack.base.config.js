const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const devtool = env === 'production' ? 'source-map' : 'eval-source-map';

const extractOrInjectStyles = env !== 'production'
  ? 'vue-style-loader'
  : MiniCssExtractPlugin.loader;

module.exports = {
  mode: env,
  devtool,
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      components: path.resolve(__dirname, '../src/components/'),
      utils: path.resolve(__dirname, '../src/utils/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/], transpileOnly: true },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          extractOrInjectStyles,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'vue-multi-select-listbox.css',
    }),
    new BundleAnalyzerPlugin(),
    new ESLintPlugin({
      extensions: ['ts', 'vue', 'js']
    }),
  ],
};
