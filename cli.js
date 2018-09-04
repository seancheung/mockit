/*eslint no-console: off*/

const args = process.argv.slice(2);
if (args.some(arg => arg === '-h' || arg === '--help')) {
    help();
} else {
    start();
}

function prepare(config, cb) {
    if (config.app.port) {
        cb();
    } else {
        require('./src/allocate')(8080, config.app.host, (err, port) => {
            if (err) {
                console.error(err);
                process.exit(1);
            } else {
                config.app.port = port;
                cb();
            }
        });
    }
}

function start() {
    const opts = {
        alias: {
            host: ['H'],
            port: ['P'],
            db: ['D'],
            ssl: ['S'],
            cors: ['X'],
            cert: ['C'],
            key: ['K'],
            open: ['O']
        },
        string: ['host', 'db', 'cert', 'key', 'format'],
        number: ['port'],
        boolean: ['ssl', 'cors', 'http2', 'silent', 'open']
    };
    const argv = require('yargs-parser')(args, opts);
    const config = require('./config.json');
    config.__dirname = process.cwd();
    if (argv.host) {
        config.app.host = argv.host;
    }
    if (argv.port) {
        config.app.port = argv.port;
    }
    if (argv.db) {
        config.db.file = argv.db;
    }
    if (argv.ssl) {
        config.ssl.enabled = true;
        config.ssl.cert = argv.cert;
        config.ssl.key = argv.key;
    }
    if (argv.http2) {
        config.app.http2 = true;
    }
    if (argv.silent) {
        config.logger.enabled = false;
    }
    if (argv.format) {
        config.logger.type = argv.format;
    }
    prepare(config, () => {
        const server = require('./src/server');
        const ifaces = require('os').networkInterfaces();
        server.on('listening', () => {
            const host =
                config.app.host === '0.0.0.0' ? '127.0.0.1' : config.app.host;
            const port = config.app.port;
            const protocol = config.ssl.enabled ? 'https' : 'http';

            console.info('\x1b[33m%s\x1b[0m', 'Listening on:');
            if (config.app.host && config.app.host !== '0.0.0.0') {
                console.info(
                    '\x1b[32m%s\x1b[0m',
                    `${protocol}://${host}:${port}`
                );
            } else {
                Object.values(ifaces).forEach(info =>
                    info.forEach(details => {
                        if (details.family === 'IPv4') {
                            console.info(
                                '\x1b[32m%s\x1b[0m',
                                `${protocol}://${details.address}:${port}`
                            );
                        }
                    })
                );
            }
            console.log('\x1b[33m%s\x1b[0m', 'Hit CTRL-C to stop the server');
            if (argv.open) {
                require('opener')(`${protocol}://${host}:${port}`);
            }
        });
        if (process.platform === 'win32') {
            require('readline')
                .createInterface({
                    input: process.stdin,
                    output: process.stdout
                })
                .on('SIGINT', function() {
                    process.emit('SIGINT');
                });
        }
        process.on('SIGINT', () => {
            console.log('http-server stopped.');
            process.exit();
        });
        process.on('SIGTERM', () => {
            console.log('http-server stopped.');
            process.exit();
        });
    });
}

function help() {
    console.log('\nUsage: mockit [options]\n');
    console.log('options:');
    console.log('   -H, --host=<host>   host name');
    console.log('   -P, --port=<port>   port number');
    console.log('   -D, --db=<path>     database file path');
    console.log('   -S, --ssl           enable https');
    console.log('   -X, --cors          enable CORS');
    console.log('       --http2         enable http2');
    console.log('   -C, --cert=<path>   ssl cert file path');
    console.log('   -K, --key=<path>    ssl key file path');
    console.log('   -O, --open          open browser');
    console.log('       --silent        no request log');
    console.log(
        '   --format=<type>     request log format(combined|common|short|tiny|dev)'
    );
    console.log('   -h, --help          show this help');
}
