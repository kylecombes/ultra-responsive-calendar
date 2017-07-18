const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'src');
const EXAMPLE_DIR = path.resolve(__dirname, 'example');

module.exports = {
    entry: {
        'build/bundle' : './index.js',
        'build/SampleApp-bundle': './example/SampleApp.jsx'
    },
    output: {
        path: __dirname,
        filename: '[name].js'
    },
    target: 'web',
    module: {
        loaders : [
            {
                test : /\.js?x?/,
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
