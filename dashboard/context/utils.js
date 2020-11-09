export function pluck(obj, ...keys) {
    return keys.reduce(
        (t, c) => (c in obj ? Object.assign(t, { [c]: obj[c] }) : t),
        {}
    );
}

export function strip(obj, ...keys) {
    return Object.keys(obj)
        .filter(k => !keys.includes(k))
        .reduce((t, c) => Object.assign(t, { [c]: obj[c] }), {});
}

export function typeToMode(type) {
    switch (type) {
    case 'application/json':
    case 'text/json':
        return 'json';
    case 'application/xml':
    case 'text/xml':
        return 'xml';
    case 'application/html':
    case 'text/html':
        return 'html';
    case 'application/css':
    case 'text/css':
        return 'css';
    case 'application/javascript':
    case 'text/javascript':
        return 'javascript';
    default:
        return 'text';
    }
}
