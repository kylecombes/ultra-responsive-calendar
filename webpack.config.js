const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src');
const EXAMPLE_DIR = path.resolve(__dirname, 'example');

module.exports = {
  devtool: 'source-map',
  entry: {
    'build/bundle': './src/ultra-responsive-calendar.jsx',
    'build/SampleApp-bundle': './example/SampleApp.jsx',
  },
  output: {
    path: __dirname,
    filename: '[name].js',
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.jsx?/,
        include: [APP_DIR, EXAMPLE_DIR],
        exclude: '/example/build',
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: [APP_DIR, EXAMPLE_DIR],
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  devServer: {
    contentBase: ['./example', '.'],
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
