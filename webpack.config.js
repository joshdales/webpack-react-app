const path = require('path')
const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const inDevMode = process.env.NODE_ENV === 'development'

/**
 * The entry points to our code
 */
let entry = [
  './src/index.tsx'
]

/**
 * The sourcemap (or lack there of) that we are going to be using
 */
let devtool = false

/**
 * The webpack plugins that we are going to be using
 */
let plugins = [
  new HtmlWebpackPlugin(),
  new ForkTsCheckerWebpackPlugin({
    eslint: {
      files: './src/**/*.{ts,tsx,js,jsx}'
    }
  })
]

if (inDevMode) {
  devtool = 'eval-cheap-module-source-map'
  entry = entry.concat('webpack-hot-middleware/client')
  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'whm'
      }
    })
  ])
}

module.exports = {
  mode: inDevMode ? "development" : "production",
  devtool,
  entry,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: inDevMode ? "/" : './',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: inDevMode ? [
              'react-refresh/babel'
            ] : undefined,
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
              "@babel/preset-react"
            ]
          }
        }
      },
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins,
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\//]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
}
