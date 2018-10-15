/*eslint no-console: off*/

const fs = require('fs');
const { Router } = require('express');
const Database = require('./db');
const mount = require('./mount');

function mockit(file, watch) {
    const db = new Database();
    const router = Router({ mergeParams: true });
    let subRouter;

    function loadDb(filepath) {
        let config;
        if (/\.json$/i.test(filepath)) {
            config = JSON.parse(fs.readFileSync(filepath, 'utf8'));
        } else if (/\.ya?ml$/i.test(filepath)) {
            config = require('js-yaml').safeLoad(
                fs.readFileSync(filepath, 'utf8')
            );
        } else {
            throw new Error('Unsupported file type: ' + filepath);
        }

        db.load(config);
    }

    function loadRouter() {
        const router = Router({ mergeParams: true });
        for (const doc of db.all()) {
            mount(router, doc);
        }
        subRouter = router;
    }

    if (watch) {
        require('chokidar')
            .watch(file)
            .on('change', function(filename) {
                console.log('file changed: %s', filename);
                loadDb(filename);
                loadRouter();
            })
            .on('unlink', function(filename) {
                console.log('file removed: %s', filename);
                db.drop();
                loadRouter();
            })
            .on('error', err => console.error(err));
    }

    router.use((req, res, next) => {
        if (subRouter) {
            subRouter(req, res, next);
        } else {
            next();
        }
    });

    loadDb(file);
    loadRouter();

    return router;
}

mockit.default = mockit;

module.exports = mockit;
