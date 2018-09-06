module.exports = config => {
    const logger = require('./logger');
    if (!config.debug) {
        logger.log = () => {};
    }
    const options = require('../client/webpack.config');
    const db = require('./db');
    if (config.router.routes) {
        db.load(config.router.routes);
    }
    const app = require('./app');
    if (config.logger && config.logger.enabled) {
        app.use(require('morgan')(config.logger.type || 'combined'));
    }
    const router = require('./router')(app, config.router, db);
    require('./dashboard')(app, config.dashboard, db, router, options);
    require('./handler')(app);

    let server;
    if (config.ssl && config.ssl.enabled) {
        const fs = require('fs');
        const opts = {
            cert: fs.readFileSync(config.ssl.cert, 'utf8'),
            key: fs.readFileSync(config.ssl.key, 'utf8')
        };
        if (config.http2) {
            server = require('http2').createSecureServer(opts, app);
        } else {
            server = require('https').createServer(opts, app);
        }
    } else if (config.http2) {
        server = require('http2').createServer(app);
    } else {
        server = require('http').createServer(app);
    }

    server.on('error', err => {
        if (err.syscall !== 'listen') {
            logger.error(err);

            return;
        }

        const bind =
            typeof config.port === 'string'
                ? 'Pipe ' + config.port
                : 'Port ' + config.port;

        // handle specific listen errors with friendly messages
        switch (err.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            logger.error(err);
        }
    });

    server.listen(config.port, config.host);

    return server;
};
