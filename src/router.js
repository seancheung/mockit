const express = require('express');
const routing = require('./routing');

module.exports = (config, db) => {
    const router = express.Router({ mergeParams: true });

    if (config.logger && config.logger.enabled) {
        router.use(require('morgan')(config.logger.type || 'combined'));
    }

    if (config.cors) {
        router.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
            );
            next();
        });
    }

    routing.mount(router, ...db.all());

    return router;
};
