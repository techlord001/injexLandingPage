const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: 'img',
                            esModule: false
                        }
                    }
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts'
                    }
                }
            },
            {
                test:/\.mp4$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'video',
                        name: '[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './src/index.html',
                hash: true
            }
        )
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    }
}