/*eslint no-console: off*/

const loki = require('lokijs');
const config = require('./config');

const db = new loki(config.db.file, {
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
