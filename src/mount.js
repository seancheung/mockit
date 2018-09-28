const logger = require('./logger');

module.exports = (router, route) => {
    if (route.bypass) {
        logger.log('bypassed route', route.method.toUpperCase(), route.path);
    } else {
        if (route.proxy) {
            router[route.method](route.path, require('./proxy')(route));
        } else {
            router[route.method](route.path, (req, res, next) => {
                const handler = () => {
                    try {
                        if (route.code) {
                            res.status(route.code);
                        }
                        if (route.headers) {
                            Object.entries(route.headers).forEach(([k, v]) =>
                                res.setHeader(k, v)
                            );
                        }
                        if (route.body != null) {
                            res.send(route.body);
                        } else {
                            res.end();
                        }
                    } catch (error) {
                        next(error);
                    }
                };
                if (route.delay) {
                    setTimeout(handler, route.delay);
                } else {
                    handler();
                }
            });
        }
        logger.log('mounted route', route.method.toUpperCase(), route.path);
    }
};
