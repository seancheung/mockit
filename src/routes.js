const express = require('express');
const boot = require('./boot');

const router = express.Router({ mergeParams: true });

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

const db = require('./db');
db.on('ready', () => {
    const routes = db
        .getCollection('routes')
        .chain()
        .find()
        .data();
    boot(router, routes);
});

module.exports = router;
