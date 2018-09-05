const symbol = Symbol('db');

module.exports = {
    [symbol]: Array(),

    all() {
        return JSON.parse(JSON.stringify(this[symbol]));
    },

    count() {
        return this[symbol].length;
    },

    exists(method, path) {
        return (
            typeof method === 'string' &&
            typeof path === 'string' &&
            this[symbol].some(
                doc =>
                    doc.method.toLowerCase() === method.toLowerCase() &&
                    doc.path.toLowerCase() === path.toLowerCase()
            )
        );
    },

    existsAt(index) {
        return this[symbol][index] != null;
    },

    find(method, path) {
        if (typeof method === 'string' && typeof path === 'string') {
            const doc = this[symbol].find(
                doc =>
                    doc.method.toLowerCase() === method.toLowerCase() &&
                    doc.path.toLowerCase() === path.toLowerCase()
            );
            if (doc) {
                return JSON.parse(JSON.stringify(doc));
            }
        }
    },

    findAt(index) {
        const doc = this[symbol][index];
        if (doc) {
            return JSON.parse(JSON.stringify(doc));
        }
    },

    insert(route) {
        if (
            !route ||
            typeof route.method !== 'string' ||
            typeof route.path !== 'string' ||
            this.exist(route.method, route.path)
        ) {
            return;
        }
        const plain = JSON.stringify(route);
        this[symbol].push(JSON.parse(plain));

        return JSON.parse(plain);
    },

    update(route) {
        if (
            !route ||
            typeof route.method !== 'string' ||
            typeof route.path !== 'string'
        ) {
            return;
        }
        const doc = this[symbol].find(
            doc =>
                doc.method.toLowerCase() === route.method.toLowerCase() &&
                doc.path.toLowerCase() === route.path.toLowerCase()
        );
        if (!doc) {
            return;
        }
        Object.assign(doc, JSON.parse(JSON.stringify(route)));

        return JSON.parse(JSON.stringify(doc));
    },

    updateAt(index, data) {
        const doc = this[symbol][index];
        if (!doc) {
            return;
        }
        data = JSON.parse(JSON.stringify(data));
        delete data.method;
        delete data.path;
        Object.assign(doc, data);

        return JSON.parse(JSON.stringify(doc));
    },

    remove(method, path) {
        if (typeof method !== 'string' && typeof path !== 'string') {
            return false;
        }
        const index = this[symbol].findIndex(
            doc =>
                doc.method.toLowerCase() === method.toLowerCase() &&
                doc.path.toLowerCase() === path.toLowerCase()
        );
        if (index < 0) {
            return false;
        }
        this[symbol].splice(index, 1);

        return true;
    },

    removeAt(index) {
        return this[symbol].splice(index, 1).length > 0;
    },

    move(index, to) {
        this[symbol].splice(to, 0, ...this[symbol].splice(index, 1));
    },

    drop() {
        this[symbol].splice(0);
    },

    dump() {
        return this.all().reduce((t, c) => {
            const key = `${c.method.toUpperCase()} ${c.path}`;
            delete c.method;
            delete c.path;

            return Object.assign(t, { [key]: c });
        }, {});
    },

    load(routes) {
        routes = JSON.parse(JSON.stringify(routes));
        this[symbol].splice(
            0,
            this[symbol].length,
            ...Object.entries(routes).map(([k, v]) => {
                const [method, path] = k.split(/\s+/, 2);

                return Object.assign(
                    {
                        method: method.toLowerCase(),
                        path
                    },
                    v
                );
            })
        );
    }
};
