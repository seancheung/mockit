export const MODES = {
    ADD: Symbol(),
    DELETE: Symbol(),
    IMPORT: Symbol(),
    EXPORT: Symbol()
};

export const FORMATS = {
    json: 'text/json',
    yaml: 'text/x-yaml'
};

export const EXTENSIONS = {
    'text/json': 'json',
    'text/x-yaml': 'yml'
};
