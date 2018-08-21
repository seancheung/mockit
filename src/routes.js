const express = require('express');
const boot = require('./boot');
const db = require('./db');
const config = require('./config');

const router = express.Router({ mergeParams: true });

if (config.logger.enabled) {
    router.use(require('morgan')(config.logger.type));
}

if (config.app.cors) {
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
    });
}

db.on('ready', () => {
    const routes = db
        .getCollection('routes')
        .chain()
        .find()
        .data();
    boot(router, routes);
});

module.exports = router;
