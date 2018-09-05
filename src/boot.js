module.exports = config => {
    const logger = require('./logger');
    if (!config.debug) {
        logger.log = () => {};
    }
    const options = require('../client/webpack.config');
    if (config.dashboard.path) {
        options.output.publicPath = config.dashboard.path + '/';
    }
    const db = require('./db');
    if (config.router.routes) {
        db.load(config.router.routes);
    }
    const router = require('./router')(config.router, db);
    const dashboard = require('./dashboard')(
        config.dashboard,
        db,
        router,
        options
    );
    const app = require('./app')(
        { path: config.dashboard.path, router: dashboard },
        { router }
    );

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
