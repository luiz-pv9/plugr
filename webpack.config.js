let webpack = require('webpack')
let path = require('path')

module.exports = {
  entry: './lib/plugr.js',
  output: {
    filename: 'plugr.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/, 
      exclude: /node_modules/, 
      loader: "babel-loader"
    }]
  }
}