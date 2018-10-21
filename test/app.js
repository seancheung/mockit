const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const config = yaml.safeLoad(
    fs.readFileSync(path.resolve(__dirname, 'config.yml'), 'utf8')
);

const logger = require('../src/logger');
logger.log = () => {};
logger.warn = () => {};
logger.error = () => {};
logger.debug = () => {};
logger.info = () => {};
const { Database } = require('mockit-express');
const db = new Database();
db.load(config.router.routes);
const app = require('../src/app');
require('../src/router')(app, config.router, db);
require('../src/dashboard')(app, config.dashboard, db);
require('../src/handler')(app);

module.exports = app;
