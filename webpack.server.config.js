const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

let externals = {};
fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => {
        externals[mod] = 'commonjs ' + mod;
    });

module.exports = {
    target: 'node',
    externals: [externals, nodeExternals()],
    entry: {
        server: './src/server/index.ts'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader'
                        // options: {
                        //     transpileOnly: true
                        // }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })]
    },
    output: {
        filename: '[name]/index.js',
        path: path.resolve(__dirname, 'dist/')
    }
};
