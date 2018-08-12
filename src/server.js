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
    console.info(
        '\x1b[33m%s\x1b[0m',
        `Listening on ${addr.address} port ${addr.port}`
    );
    const os = require('os');
    const interfaces = os.networkInterfaces();
    const hosts = [];
    Object.values(interfaces).forEach(infos =>
        infos.forEach(info => {
            if (info.family === 'IPv4') {
                if (/^127\./.test(info.address)) {
                    hosts.push(info.address);
                } else if (/^0\./.test(addr.address)) {
                    hosts.push(info.address);
                } else {
                    const p1 = addr.address.split('.');
                    const p2 = info.address.split('.');
                    if (p1[0] === p2[0] && p1[1] === p2[1]) {
                        hosts.push(info.address);
                    }
                }
            }
        })
    );
    hosts.forEach(host =>
        console.info('\x1b[32m%s\x1b[0m', `http://${host}:${addr.port}`)
    );
});

server.listen(config.app.port, config.app.host);
app.set('port', config.app.port);
app.set('host', config.app.host);

module.exports = server;
