var path = require('path');

module.exports = {
  entry: {
    bundle: './src/app.js'
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  plugins: [
  ]
}
