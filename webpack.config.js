const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    entry: {
        index: [
            './src/js/app.js',
            './src/sass/app.scss',
        ]
    },
    devServer: {
        historyApiFallback: true,
        inline: true, 
        hot: true,
        contentBase: './public',
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'public')
        // filename: 'bundle.js', 
        // path: path.resolve(__dirname, 'public'),
    },
    mode: 'development',
    // devtool: '#inline-source-map',
    // devtool: "cheap-module-eval-source-map",
    // devtool: 'source-map',
    resolve: {
        modules: ["./node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ 'css-loader', 'sass-loader' ]
                })
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new ExtractTextPlugin('../css/[name].css'),
        new ExtractTextPlugin( path.resolve(__dirname, 'public/[name].css') ),
        new UglifyJSPlugin(),
    ]
}