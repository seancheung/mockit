const express = require('express');
const routing = require('./routing');

module.exports = (app, config, db) => {
    const router = express.Router({ mergeParams: true });

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

    app.use(router);

    return router;
};
