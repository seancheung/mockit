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
