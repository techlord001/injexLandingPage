const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader'
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsPlugin(),
        new MiniCssExtractPlugin({
            filename:'style.css',
        })
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    }
})