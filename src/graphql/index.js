const fs = require('fs');
const path = require('path');
const graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const express = require('express');
const resolver = require('./resolver');

const schema = buildSchema(
    fs.readFileSync(path.resolve(__dirname, './graph.txt'), 'utf8')
);

const router = express.Router({ mergeParams: true });

router.use(
    '/graphql',
    graphql({
        graphiql: true,
        schema,
        rootValue: resolver
    })
);

module.exports = router;
