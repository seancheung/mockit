/*eslint no-console: off*/
const http = require('http');
const config = require('./config');
const app = require('./app');

const server = http.createServer(app);

server.on('error', err => {
    if (err.syscall !== 'listen') {
        console.error(err);

        return;
    }

    const bind =
        typeof config.app.port === 'string'
            ? 'Pipe ' + config.app.port
            : 'Port ' + config.app.port;

    // handle specific listen errors with friendly messages
    switch (err.code) {
    case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
    default:
        console.error(err);
    }
});

server.on('listening', () => {
    const addr = server.address();
    const bind =
        typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.info('Listening on ' + addr.address + ':' + bind);
});

server.listen(config.app.port, config.app.host);
app.set('port', config.app.port);
app.set('host', config.app.host);

module.exports = server;
