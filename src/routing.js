const logger = require('./logger');

function mount(router, route) {
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
}

module.exports = {
    /**
     * Attach routes to the given router
     *
     * @param {Router} router
     * @param  {...any} routes
     */
    mount(router, ...routes) {
        for (const route of routes) {
            mount(router, route);
            logger.log('mounted route', route.method.toUpperCase(), route.path);
        }
    },

    /**
     * Detach routes from the given router
     *
     * @param {Router} router
     * @param  {...any} routes
     */
    unmount(router, ...routes) {
        for (const route of routes) {
            const index = router.stack.findIndex(
                layer =>
                    layer.route &&
                    layer.route.path === route.path &&
                    layer.route.methods[route.method] === true
            );
            if (index >= 0) {
                router.stack.splice(index, 1);
                logger.log(
                    'unmounted route',
                    route.method.toUpperCase(),
                    route.path
                );
            }
        }
    },

    /**
     * Re-attach routes to the given router
     *
     * @param {Router} router
     * @param  {...any} routes
     */
    remount(router, ...routes) {
        for (const route of routes) {
            const index = router.stack.findIndex(
                layer =>
                    layer.route &&
                    layer.route.path === route.path &&
                    layer.route.methods[route.method] === true
            );
            if (index >= 0) {
                router.stack.splice(index, 1);
                mount(router, route);
                const pos = router.stack.findIndex(
                    layer =>
                        layer.route &&
                        layer.route.path === route.path &&
                        layer.route.methods[route.method] === true
                );
                router.stack.splice(index, 0, ...router.stack.splice(pos, 1));
                logger.log(
                    'remounted route',
                    route.method.toUpperCase(),
                    route.path
                );
            }
        }
    }
};
