const path = require('path')

module.exports = {
  devtool: 'eval-cheap-module-source-map',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', 'jsx', 'ts', 'tsx']
  },
  module: {
    rules: [
      {
        test: '/.tsx$/',
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
              "@babel/preset-react", {
                "runtime": "automatic"
              }
            ]
          }
        }
      }
    ]
  }
}