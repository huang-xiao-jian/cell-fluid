/**
 * @description - webpack development configuration
 * @author - huang.jian
 */

// packages
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InjectExternalPlugin = require('@coco-platform/webpack-plugin-inject-external');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    main: path.resolve(process.cwd(), './public/main.tsx'),
  },
  output: {
    path: path.resolve(process.cwd(), 'dist', 'client'),
    publicPath: '/',
    filename: 'static/script/[name].bundle.js',
    chunkFilename: 'static/script/[id]_[name].chunk.js',
    crossOriginLoading: 'anonymous',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.mjs', '.json', '.ts', '.tsx'],
    alias: {},
  },
  module: {
    noParse: [/\.min\.js/],
    rules: [
      {
        test: /\.(js|jsx|mjs|mjsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: [
          path.resolve(process.cwd(), 'src'),
          path.resolve(process.cwd(), 'public'),
        ],
        use: [
          { loader: require.resolve('style-loader') },
          { loader: require.resolve('css-loader') },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|bmp|mp3|woff|woff2|ttf|eot|svg)(\?.*)?$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(process.cwd(), 'public', 'index.html'),
      favicon: path.join(process.cwd(), 'public', 'favicon.ico'),
    }),
    new InjectExternalPlugin({
      env: 'development',
      definition: 'bootcdn.stable.yml',
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
  },
  devtool: 'cheap-module-source-map',
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    crypto: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  devServer: {
    historyApiFallback: true,
    proxy: [
      {
        context: ['/data_analyze'],
        target: 'https://github.com',
        changeOrigin: true,
        secure: false,
      },
    ],
  },
};
