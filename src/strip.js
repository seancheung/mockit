/*eslint no-console: off*/
module.exports = (router, route) => {
    const index = router.stack.findIndex(
        layer =>
            layer.route &&
            layer.route.path === route.path &&
            layer.route.methods[route.method] === true
    );
    if (index >= 0) {
        router.stack.splice(index, 1);
        console.log('removed route', route.method.toUpperCase(), route.path);
    }
};
