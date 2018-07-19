const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './index.jsx')
    },
    mode: 'development',
    output: {
        filename: '[name].js',
        publicPath: '/'
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
    resolve: { extensions: ['.js', '.jsx'] }
};
