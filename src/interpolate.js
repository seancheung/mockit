const vm = require('vm');
const faker = require('faker');

function interpolate(src, req) {
    if (typeof src !== 'string') {
        return src;
    }

    return src.replace(/\$\{(.+?)\}/g, (_, exp) =>
        vm.runInNewContext(exp, { faker, params: req.params, query: req.query })
    );
}

module.exports = route => (req, res, next) => {
    const $route = {},
        { code, headers, body, cond } = route;
    if (code) {
        $route.code = route.code;
    }
    if (headers) {
        $route.headers = Object.assign({}, headers);
    }
    if (body != null) {
        $route.body = interpolate(body, req);
    }
    if (cond) {
        for (const item of cond) {
            const success = vm.runInNewContext(item.case, {
                params: req.params,
                query: req.query
            });
            if (success === true) {
                if (item.code) {
                    $route.code = item.code;
                }
                if (item.body) {
                    $route.body = interpolate(item.body, req);
                }
                if (item.headers) {
                    $route.headers = Object.assign(
                        $route.headers || {},
                        item.headers
                    );
                }
                break;
            }
        }
    }
    req.$route = $route;
    next();
};
