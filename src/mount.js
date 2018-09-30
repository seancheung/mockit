const logger = require('./logger');
const interpolate = require('./interpolate');

module.exports = (router, route) => {
    if (route.bypass) {
        logger.log('bypassed route', route.method.toUpperCase(), route.path);
    } else {
        if (route.proxy) {
            router[route.method](route.path, require('./proxy')(route));
        } else {
            router[route.method](route.path, interpolate(route), (req, res) => {
                const { code, headers, body, delay } = req.$route || {};
                const handler = () => {
                    if (code) {
                        res.status(code);
                    }
                    if (headers) {
                        for (const key in headers) {
                            res.setHeader(key, headers[key]);
                        }
                    }
                    if (body != null) {
                        res.send(body);
                    } else {
                        res.end();
                    }
                };
                if (delay) {
                    setTimeout(handler, delay);
                } else {
                    handler();
                }
            });
        }
        logger.log('mounted route', route.method.toUpperCase(), route.path);
    }
};
