const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src');
const EXAMPLE_DIR = path.resolve(__dirname, 'example');

module.exports = {
    entry: {
        'build/bundle' : './app.js',
    },
    output: {
        path: __dirname,
        filename: '[name].js',
        library: 'UltraResponsiveCalendar',
    },
    externals: {
        moment: 'moment',
    },
    target: 'web',
    module: {
        loaders : [
            {
                test : /\.jsx?/,
                include : [APP_DIR, EXAMPLE_DIR],
                exclude: '/example/build',
                loader : 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                include : [APP_DIR, EXAMPLE_DIR],
                loader: 'style-loader!css-loader'
            },
        ]
    }
};
