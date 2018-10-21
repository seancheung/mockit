const express = require('express');
const mockit = require('mockit-express');

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
    router.use(mockit(db));

    app.use(router);
};
