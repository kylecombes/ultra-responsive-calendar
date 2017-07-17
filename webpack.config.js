const path = require('path');
const webpack = require('webpack');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
    entry: APP_DIR + '/index.js',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel-loader'
            },
            {
                test: /\.css$/,
                include : APP_DIR,
                loader: 'style-loader!css-loader'
            },
        ]
    },
    externals: {
        'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
    }
};
