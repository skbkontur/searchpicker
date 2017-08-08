module.exports = {
    entry: {
        searchpickerjs: ["./sample/main.ts"]
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        publicPath: "/dist/",
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
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader?configFileName=./tsconfig.json'
            }
        ]
    },
    plugins: [
    ]
};
