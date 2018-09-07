const path = require('path');
const express = require('express');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');

module.exports = (app, config, db, target, options) => {
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

    dashboard.head('/routes', (req, res, next) => {
        try {
            const success = db.exists(req.query.method, req.query.path);
            res.status(success ? 200 : 404).end();
        } catch (error) {
            next(error);
        }
    });

    dashboard.get('/routes', (req, res, next) => {
        try {
            const offset = req.query.offset ? parseInt(req.query.offset) : 0;
            const limit = req.query.limit && parseInt(req.query.limit);
            const count = db.count();
            const records = Array.from(db.select(offset, limit));
            res.json({ count, offset, limit, records });
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
            target.reload();
            res.status(201).end();
        } catch (error) {
            next(error);
        }
    });

    dashboard.head('/routes/:id', (req, res, next) => {
        try {
            const success = db.has(req.params.id);
            res.status(success ? 200 : 404).end();
        } catch (error) {
            next(error);
        }
    });

    dashboard.get('/routes/:id', (req, res, next) => {
        try {
            const doc = db.find(req.params.id);
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

    dashboard.put('/routes/:id', (req, res, next) => {
        try {
            if (!db.has(req.params.id)) {
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
            const doc = db.update(req.params.id, data);
            if (!doc) {
                const error = new Error('failed to update data');
                error.status = 500;
                throw error;
            }
            target.reload();
            res.json(doc);
        } catch (error) {
            next(error);
        }
    });

    dashboard.delete('/routes/:id', (req, res, next) => {
        try {
            if (!db.remove(req.params.id)) {
                const error = new Error('not found');
                error.status = 404;
                throw error;
            }
            target.reload();
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    });

    dashboard.get('/template', (req, res, next) => {
        try {
            res.json(config.template);
        } catch (error) {
            next(error);
        }
    });

    dashboard.get('/export', async (req, res, next) => {
        try {
            if (/ya?ml$/i.test(req.headers['accept'])) {
                await db.ydump(res.type('yaml'));
            } else {
                await db.dump(res.type('json'));
            }
        } catch (error) {
            next(error);
        }
    });

    dashboard.post('/import', (req, res, next) => {
        try {
            let data;
            if (/ya?ml$/i.test(req.body.type)) {
                data = require('js-yaml').safeLoad(req.body.data);
            } else {
                data = JSON.parse(req.body.data);
            }
            db.load(data);
            res.status(201).end();
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
