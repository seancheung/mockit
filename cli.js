/*eslint no-console: off*/

const args = process.argv.slice(2);
if (args.some(arg => arg === '-h' || arg === '--help')) {
    help();

    return;
}
const [command] = args.splice(0, 1);

switch (command) {
case 'start':
    start();
    break;
default:
    console.error('unknow command. run -h,--help for help');
    break;
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
            db: ['D']
        },
        string: ['host', 'db'],
        number: ['port']
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
    prepare(config, () => require('./src/server'));
}

function help() {
    console.log('\nUsage: mockit <command> [options]\n');
    console.log('Commands:\n');
    console.log('  start');
    console.log('      -H, --host=<host>\t\t\thost name');
    console.log('      -P, --port=<port>\t\t\tport number');
    console.log('      -D, --db=<path>\t\t\tdatabase file path');
}
