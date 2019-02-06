const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = (env, options) => {
    const devMode = options.mode === 'development' ? true : false;
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app.bundle.js'
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
                        test: /\.svg$/,
                        use: {
                            loader: 'file-loader',
                            options: {
                                outputPath: './images/svg'
                            }
                        }
                },
                {
                    test: /\.scss$/,
                    use: [{
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader', options: { sourceMap: true }
                    }, {
                        loader: 'sass-loader', options: { sourceMap: true }
                    }]
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new CopyWebpackPlugin([
                { from:'./src/images',to:'images' } 
            ]),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ]
    }
    
}