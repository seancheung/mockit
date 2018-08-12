const net = require('net');

function allocate(port, host, cb, max) {
    const server = net.createServer();
    server.listen(port, host);
    server.on('listening', () => {
        server.once('close', () => cb(null, port));
        server.close();
    });
    server.on('error', err => {
        if (err.code !== 'EADDRINUSE') {
            cb(err);
        } else if (max && port >= max) {
            cb(err);
        } else {
            allocate(port + 1, host, cb, max);
        }
    });
}

module.exports = allocate;
