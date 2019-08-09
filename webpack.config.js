const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        searchpicker: "./src/index.ts",
        app: "./sample/main.ts"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        publicPath: "",
        chunkFilename: "[name].js"
    },
    resolve: {
        extensions: ['.ts','.js']
    },
    devtool: 'source-map',
    devServer: {
        port: 8080,
        host:'localhost',
        //host: 'k1608038.kontur',
        watchOptions: {
            ignored: /node_modules/
        },
        inline: true
    },

    // Add the loader for .ts files.
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader?configFileName=./tsconfig.json'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'src/css/searchPicker.css',
                to: 'searchPicker.css'
            },
            {
                from: 'sample/sample.css',
                to: 'sample.css'
            },
            {
                from: 'index.html',
                to: 'index.html'
            }
        ]),

        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: true,
            chunksSortMode: 'dependency'
        })
    ]
};
