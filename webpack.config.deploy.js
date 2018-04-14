const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src');
const EXAMPLE_DIR = path.resolve(__dirname, 'example');

module.exports = {
  devtool: 'source-map',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'ultra-responsive-calendar.js',
    library: 'UltraResponsiveCalendar',
    libraryTarget: 'umd',
  },
  externals: {
    moment: 'moment',
  },
  target: 'web',
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        use: ["source-map-loader"],
        exclude: ['node_modules'],
        enforce: "pre"
      },
      {
        test: /\.jsx?/,
        include: [APP_DIR, EXAMPLE_DIR],
        exclude: '/example/build',
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: [APP_DIR, EXAMPLE_DIR],
        loader: 'style-loader!css-loader'
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
