const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = mode => ({
    mode,
    entry: {
        main: [path.resolve(__dirname, './index.jsx')]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../www')
    },
    module: {
        rules: [
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { presets: ['react', 'env'] }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.woff2?$/,
                use: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.join(__dirname, '../node_modules')]
    },
    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html')
        }),
        ...(mode !== 'production'
            ? []
            : [
                new CleanWebpackPlugin(['www/*'], {
                    root: path.resolve(__dirname, '../'),
                    exclude: ['.gitignore']
                }),
                new UglifyJsPlugin({
                    parallel: true,
                    extractComments: true
                })
            ])
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../www'),
        after: function(app) {
            const mockit = require('mockit-express');
            const db = new mockit.Database();
            const yaml = require('fs').readFileSync(path.resolve(__dirname, '../template.yml'));
            const template = require('js-yaml').safeLoad(yaml);
            const bodyParser = require('body-parser');
            require('../src/dashboard')(app, { template }, db, router => {
                router.use(bodyParser.json());
                router.use(bodyParser.urlencoded({ extended: false }));
            });
            app.use(mockit(db));
        }
    }
});
