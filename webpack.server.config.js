const fs = require('fs');
const path = require('path');

let externals = {};
fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => {
        externals[mod] = 'commonjs ' + mod;
    });

module.exports = {
    target: 'node',
    externals: externals,
    entry: {
        server: './src/server/index.ts'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name]/index.js',
        path: path.resolve(__dirname, 'dist/')
    }
};
