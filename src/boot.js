/*eslint no-console: off*/
module.exports = (router, routes) => {
    for (const route of routes) {
        router[route.method](route.path, (req, res, next) => {
            if (route.bypass) {
                next();
            } else {
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
            }
        });
        console.log('booted route', route.method.toUpperCase(), route.path);
    }
};
