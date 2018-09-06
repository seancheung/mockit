const express = require('express');
const routing = require('./routing');

module.exports = (app, config, db) => {
    const target = {};

    function reload() {
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
        target.router = router;
    }

    app.use((req, res, next) => {
        if (target.router) {
            target.router(req, res, next);
        } else {
            next();
        }
    });

    target.reload = reload;

    return target;
};
