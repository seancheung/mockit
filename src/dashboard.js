const path = require('path');
const crypto = require('crypto');
const express = require('express');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const boot = require('./boot');
const strip = require('./strip');
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
        const { method, path, delay, code, headers, body, bypass } = req.body;
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

router.put('/routes/:id', (req, res, next) => {
    try {
        const col = db.getCollection('routes');
        const doc = col.by('id', req.params.id);
        if (!doc) {
            const error = new Error('not found');
            error.status = 404;
            throw error;
        }
        const { delay, code, headers, body, bypass } = req.body;
        if (delay != undefined) {
            doc.delay = delay;
        }
        if (code != undefined) {
            doc.code = code;
        }
        if (headers != undefined) {
            doc.headers = headers;
        }
        if (body != undefined) {
            doc.body = body;
        }
        if (bypass != undefined) {
            doc.bypass = bypass;
        }
        col.update(doc);
        strip(routes, doc);
        boot(routes, [doc]);
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
        strip(routes, doc);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
