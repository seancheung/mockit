/*eslint no-console: off*/

const loki = require('lokijs');
const config = require('./config');

let adapter;
if (config.db.file) {
    adapter = new loki.LokiFsAdapter();
} else {
    adapter = new loki.LokiMemoryAdapter();
}

const db = new loki(config.db.file, {
    adapter,
    autoload: config.db.autoload,
    autosave: config.db.autosave,
    autosaveInterval: config.db.autosaveInterval,
    autoloadCallback: err => {
        if (err) {
            console.error(err);
        } else if (!db.getCollection('routes')) {
            db.addCollection('routes', { unique: ['id'] });
        }
        db.emit('ready');
    }
});

module.exports = db;
