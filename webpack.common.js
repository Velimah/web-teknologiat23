const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new WebpackPwaManifest({
      name: 'Metropolia information application',
      short_name: 'Metropolia app',
      description: 'Shows information about Metropolia campus lunch menus, bus stops, weather, bitcoin and metropolia news',
      background_color: '#ececec',
      theme_color: '#ff5000',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve('src/assets/Images/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512]
        },
      ]
    }),

    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
      {
        from: 'assets/',
        to: 'assets/',
        context: 'src/',
      },
    ]}),
    new HtmlWebpackPlugin({
      title: 'Metropolia infosovellus',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0'
      },
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
    }),
    new ESLintPlugin({})
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource'
      }
    ]
  }
};
