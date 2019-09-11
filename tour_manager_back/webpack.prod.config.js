const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    target: 'web',
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new uglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new optimizeCssAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [ miniCssExtractPlugin.loader, 'css-loader' ]
            },
            {
                test: /\.jpg$/,
                use: [{loader: 'url-loader'}]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/html/index.html",
            filename: "./index.html",
            excludeChunks: [ 'server' ]
        }),
        new miniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};