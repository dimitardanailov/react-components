const HtmlWebpackPlugin = require('html-webpack-plugin')
const { APP_DIR, DIST_DIR } = require('./utils/folders')

console.log('APP_DIR', APP_DIR)

module.exports = {
  entry: {
    main: `${APP_DIR}/index.js`,
  },
  output: {
    filename: '[name].js',
    path: DIST_DIR,
  },
  resolve: {
    modules: ['node_modules'],
  },

  node: {
    fs: 'empty',
  },

  // https://github.com/webpack-contrib/karma-webpack
  devtool: 'inline-source-map',

  devServer: {
    contentBase: DIST_DIR,
    compress: true,
    port: 7034,

    hot: true,
    hotOnly: true,
  },
  plugins: [
    // https://webpack.js.org/plugins/html-webpack-plugin/
    new HtmlWebpackPlugin({
      title: 'PWA IndexedDB playground',
      template: `${APP_DIR}/index.html`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: '12',
                  },
                },
              ],
            ],
          },
        },
      },

      // Styles
      {
        test: /\.css$/,
        use: [
          // css - loader -> translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: true,
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
        ],
      },
    ],
  },
}
