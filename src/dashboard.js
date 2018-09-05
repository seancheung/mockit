const path = require('path');
const express = require('express');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const routing = require('./routing');

module.exports = (app, config, db, router, options) => {
    let baseUrl;
    if (config.baseUrl) {
        baseUrl = (config.baseUrl + '/').replace(/\/{2,}/g, '/');
    } else {
        baseUrl = '/';
    }
    const dashboard = express.Router({ mergeParams: true });
    const compiler = webpack(
        Object.assign({}, options, {
            output: Object.assign({}, options.output, {
                publicPath: baseUrl
            }),
            plugins: [
                new webpack.DefinePlugin({
                    BASE_URL: JSON.stringify(baseUrl.replace(/\/$/, '')) || '/'
                })
            ]
        })
    );

    dashboard.use(
        middleware(compiler, {
            publicPath: '/',
            logLevel: 'error'
        })
    );
    dashboard.use(express.static(path.resolve(__dirname, '../client/public')));

    if (config.logger && config.logger.enabled) {
        router.use(require('morgan')(config.logger.type || 'combined'));
    }

    dashboard.get('/routes', (req, res, next) => {
        try {
            const docs = db.all();
            res.json(docs);
        } catch (error) {
            next(error);
        }
    });

    dashboard.post('/routes', (req, res, next) => {
        try {
            const {
                method,
                path,
                delay,
                code,
                headers,
                body,
                bypass
            } = req.body;
            if (!method || !path) {
                const error = new Error('missing required arguments');
                error.status = 400;
                throw error;
            }
            const data = {
                path,
                method: method.toLowerCase()
            };
            if (delay != undefined) {
                data.delay = delay;
            }
            if (code != undefined) {
                data.code = code;
            }
            if (headers != undefined) {
                data.headers = headers;
            }
            if (body != undefined) {
                data.body = body;
            }
            if (bypass != undefined) {
                data.bypass = bypass;
            }
            const doc = db.insert(data);
            if (!doc) {
                const error = new Error('failed to insert data');
                error.status = 500;
                throw error;
            }
            routing.mount(router, doc);
            res.status(201).end();
        } catch (error) {
            next(error);
        }
    });

    dashboard.get('/routes/:index', (req, res, next) => {
        try {
            const doc = db.findAt(req.params.index);
            if (!doc) {
                const error = new Error('not found');
                error.status = 404;
                throw error;
            }
            res.json(doc);
        } catch (error) {
            next(error);
        }
    });

    dashboard.put('/routes/:index', (req, res, next) => {
        try {
            if (!db.existsAt(req.params.index)) {
                const error = new Error('not found');
                error.status = 404;
                throw error;
            }
            const { delay, code, headers, body, bypass } = req.body;
            const data = {};
            if (delay != undefined) {
                data.delay = delay;
            }
            if (code != undefined) {
                data.code = code;
            }
            if (headers != undefined) {
                data.headers = headers;
            }
            if (body != undefined) {
                data.body = body;
            }
            if (bypass != undefined) {
                data.bypass = bypass;
            }
            const doc = db.updateAt(req.params.index, data);
            if (!doc) {
                const error = new Error('failed to update data');
                error.status = 500;
                throw error;
            }
            routing.remount(router, doc);
            res.json(doc);
        } catch (error) {
            next(error);
        }
    });

    dashboard.delete('/routes/:index', (req, res, next) => {
        try {
            const doc = db.findAt(req.params.index);
            if (!doc) {
                const error = new Error('not found');
                error.status = 404;
                throw error;
            }
            if (!db.removeAt(req.params.index)) {
                const error = new Error('failed to remove data');
                error.status = 500;
                throw error;
            }
            routing.unmount(router, doc);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    });

    dashboard.get('/export', (req, res, next) => {
        try {
            let data = db.dump(),
                ext;
            if (/ya?ml$/i.test(req.headers.accept)) {
                data = require('js-yaml').safeDump(data);
                ext = 'yaml';
            } else {
                data = JSON.stringify(data);
                ext = 'json';
            }
            res.type(ext).send(data);
        } catch (error) {
            next(error);
        }
    });

    if (config.baseUrl) {
        app.use(config.baseUrl, dashboard);
    } else {
        app.use(dashboard);
    }

    return dashboard;
};
