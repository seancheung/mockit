const path = require('path');
const crypto = require('crypto');
const express = require('express');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const boot = require('./boot');
const db = require('./db');
const routes = require('./routes');
const options = require('../client/webpack.config');

const router = express.Router({ mergeParams: true });
const compiler = webpack(options);

router.use(
    middleware(compiler, {
        publicPath: '/',
        logLevel: 'error'
    })
);
router.use(express.static(path.resolve(__dirname, '../client/public')));

router.get('/routes', (req, res, next) => {
    try {
        const docs = db
            .getCollection('routes')
            .chain()
            .find()
            .data();
        res.json(docs);
    } catch (error) {
        next(error);
    }
});

router.post('/routes', (req, res, next) => {
    try {
        const { method, path, delay, code, headers, body } = req.body;
        if (!method || !path) {
            const error = new Error('missing required arguments');
            error.status = 400;
            throw error;
        }
        const id = crypto
            .createHash('md5')
            .update((method + path).toLowerCase())
            .digest('hex');
        const data = {
            id,
            path,
            method: method.toLowerCase()
        };
        if (delay) {
            data.delay = delay;
        }
        if (code) {
            data.code = code;
        }
        if (headers) {
            data.headers = headers;
        }
        if (body) {
            data.body = body;
        }
        const doc = db.getCollection('routes').insert(data);
        boot(routes, [doc]);
        res.status(201).end();
    } catch (error) {
        next(error);
    }
});

router.get('/routes/:id', (req, res, next) => {
    try {
        const doc = db.getCollection('routes').by('id', req.params.id);
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

router.delete('/routes/:id', (req, res, next) => {
    try {
        const col = db.getCollection('routes');
        const doc = col.by('id', req.params.id);
        if (!doc) {
            const error = new Error('not found');
            error.status = 404;
            throw error;
        }
        col.remove(doc);
        const index = routes.stack.findIndex(
            layer =>
                layer.route &&
                layer.route.path === doc.path &&
                layer.route.methods[doc.method] === true
        );
        if (index >= 0) {
            routes.stack.splice(index, 1);
        }
        res.json(doc);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
