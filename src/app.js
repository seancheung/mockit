/*eslint no-console: off*/
/*eslint no-unused-vars: off*/

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dashboard = require('./dashboard');
const routes = require('./routes');

const app = express();
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('combined'));

app.use('/_', dashboard);
app.use(routes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    // set http status
    res.status(err.status || 500);

    // send error
    res.json({
        error: err.status || 500,
        message: err.message
    });

    // bypass 4xx errors
    if (!err.status || !/^4[0-9]{2}/.test(err.status)) {
        console.error(err);
    }
});

module.exports = app;
