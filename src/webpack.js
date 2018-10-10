const path = require('path');
const express = require('express');

module.exports = (config, mode) => router => {
    if (mode === 'production') {
        router.use(express.static(path.resolve(__dirname, '../www')));
    } else {
        const options = require('../client/webpack.config')(mode);
        if (config.baseUrl) {
            options.output.publicPath = config.baseUrl.replace(/\/$/, '') + '/';
        }
        router.use(
            require('webpack-dev-middleware')(require('webpack')(options), {
                logLevel: 'error'
            })
        );
    }
};
