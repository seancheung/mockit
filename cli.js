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
    const path = require('path');
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
    if (!path.isAbsolute(config.db.file)) {
        config.db.file = path.resolve(config.__dirname, config.db.file);
    }
    require('./src/server');
}

function help() {
    console.log('\nUsage: mockit <command> [options]\n');
    console.log('Commands:\n');
    console.log('  start');
    console.log('      -H, --host\thost name');
    console.log('      -P, --port\tport number');
    console.log('      -D, --db\tdatabase file path');
}
