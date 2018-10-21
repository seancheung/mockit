function mockit(options) {
    let { baseUrl, template, routes } = options || {};

    return app => {
        const { Database, load } = require('mockit-express');
        if (template == null) {
            const path = require('path');
            const filepath = path.resolve(__dirname, '../template.yml');
            template = load(filepath);
        }
        if (baseUrl == null) {
            baseUrl = '/dashboard';
        }
        const db = new Database();
        if (routes != null) {
            if (typeof routes === 'string') {
                let filepath = routes;
                const path = require('path');
                if (!path.isAbsolute(filepath)) {
                    filepath = path.resolve(process.cwd(), filepath);
                }
                routes = load(filepath);
                if (options && options.watch) {
                    require('chokidar')
                        .watch(filepath)
                        .on('change', file => {
                            const data = load(file);
                            db.load(data);
                        })
                        .on('unlink', () => {
                            db.drop();
                        });
                }
            }
            db.load(routes);
        }
        require('./router')(app, { cors: true }, db);
        require('./dashboard')(app, { baseUrl, template }, db);
    };
}

module.exports = mockit;
