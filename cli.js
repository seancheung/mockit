/*eslint no-console: off*/

const args = process.argv.slice(2);
if (args.some(arg => arg === '-h' || arg === '--help')) {
    help();

    return;
}
const [command] = args.splice(0, 1);

switch (command) {
default:
    console.error('unknow command. run -h,--help for help');
    break;
}

function help() {
    console.log('\nUsage: mockit <command> [options]\n');
    console.log('Commands:\n');
    console.log('  start');
    console.log('      -H, --host\thost name');
    console.log('      -P, --port\tport number');
    console.log('      -D, --daemon\trun in daemon mode');
    console.log('  stop');
    console.log('  status');
    console.log('  restart');
    console.log('  reload');
}
