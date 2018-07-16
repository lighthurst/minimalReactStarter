const path = require('path');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  mode: 'development',
  entry: {
    client: `${SRC_DIR}/index.jsx`,
  },
  output: {
    path: DIST_DIR,
    filename: '[name]-bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'cheap-eval-source-map',
};