var path = require('path');

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: ['CodeSnippet'],
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  plugins: [
  ]
}
