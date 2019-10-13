const path = require('path');
const htmlWPPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PrettierPlugin = require("prettier-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
          components: path.resolve(__dirname, 'src/components/'),
          containers: path.resolve(__dirname, 'src/containers/'),
          images: path.resolve(__dirname, 'src/assets/images/'),
          theme: path.resolve(__dirname, 'src/assets/theme/')
        },
        extensions: ['*', '.js', '.jsx']
      },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            { test: /\.css$/, use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                },
                {
                    loader: "css-loader",
                },
                {
                    loader: "postcss-loader",
                },
            ] },
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: { modules: true }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
              }
        ]
    },
    plugins: [
        new htmlWPPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
          }),
        new PrettierPlugin({
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        encoding: 'utf-8',
        extensions: [ ".js", ".ts", ".jsx" ]
        })
    ]
};