const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;
