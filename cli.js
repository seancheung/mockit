/*eslint no-console: off*/

const args = process.argv.slice(2);
if (args.some(arg => arg === '-h' || arg === '--help')) {
    help();
} else {
    start();
}

/**
 * Allocate an unused port
 * @param {number} port beginning port
 * @param {string} host host
 * @param {(err?: Error, port?: number)} cb callback
 * @param {number} [max] max port
 */
function allocate(port, host, cb, max) {
    const net = require('net');
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

function prepare(config, cb) {
    if (config.port) {
        cb();
    } else {
        allocate(8080, config.host, (err, port) => {
            if (err) {
                console.error(err);
                process.exit(1);
            } else {
                config.port = port;
                cb();
            }
        });
    }
}

function resolve(filepath, dir) {
    const path = require('path');
    const fs = require('fs');
    if (!path.isAbsolute(filepath)) {
        filepath = path.resolve(dir || process.cwd(), filepath);
    }
    if (!fs.existsSync(filepath)) {
        throw new Error('file does not exist: ' + filepath);
    }

    return filepath;
}

function load(filepath, dir) {
    const fs = require('fs');
    filepath = resolve(filepath, dir);
    let config;
    if (/\.json$/i.test(filepath)) {
        config = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    } else if (/\.ya?ml$/i.test(filepath)) {
        config = require('js-yaml').safeLoad(fs.readFileSync(filepath, 'utf8'));
    } else {
        throw new Error('Unsupported file type: ' + filepath);
    }

    return config;
}

function start() {
    const opts = {
        alias: {
            host: ['H'],
            port: ['P'],
            ssl: ['S'],
            cert: ['C'],
            key: ['K'],
            open: ['O']
        },
        string: ['host', 'cert', 'key', 'template', 'routes', 'persist'],
        number: ['port'],
        boolean: ['ssl', 'http2', 'open', 'verbose', 'watch']
    };
    const argv = require('yargs-parser')(args, opts);

    let config, dir;
    if (argv._[0]) {
        config = load(argv._[0]);
        dir = require('path').dirname(argv._[0]);
    } else {
        config = {};
    }
    config.__dirname = process.cwd();
    if (!config.ssl) {
        config.ssl = {};
    }
    if (!config.dashboard) {
        config.dashboard = {};
    }
    if (!config.router) {
        config.router = {};
    }
    if (argv.host) {
        config.host = argv.host;
    }
    if (argv.port) {
        config.port = argv.port;
    }
    if (argv.ssl) {
        config.ssl.enabled = true;
    }
    if (argv.cert) {
        config.ssl.cert = argv.cert;
    }
    if (argv.key) {
        config.ssl.key = argv.key;
    }
    if (argv.http2) {
        config.http2 = true;
    }
    if (argv.verbose) {
        config.debug = true;
    }
    if (argv.template) {
        config.dashboard.template = load(argv.template, dir);
    } else if (typeof config.dashboard.template === 'string') {
        config.dashboard.template = load(config.dashboard.template, dir);
    }
    if (argv.routes) {
        config.router.__routes = resolve(argv.routes, dir);
        config.router.routes = load(argv.routes, dir);
    } else if (typeof config.router.routes === 'string') {
        config.router.__routes = resolve(config.router.routes, dir);
        config.router.routes = load(config.router.routes, dir);
    }
    if (argv.watch && config.router.__routes) {
        config.router.watcher = require('chokidar')
            .watch(config.router.__routes)
            .on('change', function(filename) {
                console.log('file changed: %s', filename);
                const routes = load(filename);
                this.emit('reloaded', routes);
            })
            .on('unlink', function(filename) {
                console.log('file removed: %s', filename);
                this.emit('reloaded');
            })
            .on('error', err => console.error(err));
    }
    if (argv.persist) {
        config.router.persist = require('fs').createWriteStream(argv.persist);
    } else if (typeof config.router.persist === 'string') {
        config.router.persist = require('fs').createWriteStream(
            config.router.persist
        );
    }
    prepare(config, () => {
        const server = require('./src/boot')(config);
        const ifaces = require('os').networkInterfaces();
        server.on('listening', () => {
            const host = config.host === '0.0.0.0' ? '127.0.0.1' : config.host;
            const port = config.port;
            const protocol =
                config.ssl && config.ssl.enabled ? 'https' : 'http';

            console.info('\x1b[33m%s\x1b[0m', 'Listening on:');
            if (config.host && config.host !== '0.0.0.0') {
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
            const dashboard =
                (config.dashboard && config.dashboard.baseUrl) || '';
            console.log(
                '\x1b[36m%s\x1b[0m',
                `Dashboard:\n${protocol}://${host}:${port}${dashboard}`
            );
            console.log('\x1b[33m%s\x1b[0m', 'Hit CTRL-C to stop the server');
            if (argv.open) {
                require('opener')(`${protocol}://${host}:${port}${dashboard}`);
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
    console.log('\nUsage: mockit [options] [config]\n');
    console.log('options:');
    console.log('   -H, --host=<host>       host name');
    console.log('   -P, --port=<port>       port number');
    console.log('   -S, --ssl               enable https');
    console.log('       --http2             enable http2');
    console.log('       --template=<path>   template file path');
    console.log('       --routes=<path>     routes file path');
    console.log('       --watch             enable routes file watch');
    console.log('       --persist=<path>    dump file path');
    console.log('   -C, --cert=<path>       ssl cert file path');
    console.log('   -K, --key=<path>        ssl key file path');
    console.log('   -O, --open              open browser');
    console.log('       --verbose           output verbose info');
    console.log('   -h, --help              show this help');
}
