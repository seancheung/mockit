/*eslint no-unused-vars: off*/
const logger = require('./logger');

module.exports = app => {
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
        // set http status
        res.status(err.status || 500);

        // send error
        res.json({
            error: err.status || 500,
            message: err.message
        });

        // bypass 4xx errors
        if (!err.status || !/^4[0-9]{2}/.test(err.status)) {
            logger.error(err);
        }
    });
};
