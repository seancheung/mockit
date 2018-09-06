export const LIST = 'LIST_ROUTES';
export const INSERT = 'INSERT_ROUTE';
export const REMOVE = 'REMOVE_ROUTE';
export const UPDATE = 'UPDATE_ROUTE';
export const EXPORT = 'EXPORT_ROUTES';
export const IMPORT = 'IMPORT_ROUTES';

export function beginList(index, size) {
    return {
        type: LIST,
        pending: true,
        error: null,
        pagination: {
            index,
            size
        }
    };
}

export function endList(error, data) {
    return {
        type: LIST,
        pending: false,
        error: error,
        data
    };
}

export function beginInsert(data) {
    return {
        type: INSERT,
        pending: true,
        error: null,
        data
    };
}

export function endInsert(error, data) {
    return {
        type: INSERT,
        pending: false,
        error: error,
        data
    };
}

export function beginRemove(index) {
    return {
        type: REMOVE,
        pending: true,
        error: null,
        index
    };
}

export function endRemove(error, index) {
    return {
        type: REMOVE,
        pending: false,
        error: error,
        index
    };
}

export function beginUpdate(index, data) {
    return {
        type: UPDATE,
        pending: true,
        error: null,
        index,
        data
    };
}

export function endUpdate(error, { index, data } = {}) {
    return {
        type: UPDATE,
        pending: false,
        error: error,
        index,
        data
    };
}

export function beginExport() {
    return {
        type: EXPORT,
        pending: true,
        error: null
    };
}

export function endExport(error, data) {
    return {
        type: EXPORT,
        pending: false,
        error: error,
        data
    };
}

export function beginImport(data) {
    return {
        type: IMPORT,
        pending: true,
        error: null,
        data
    };
}

export function endImport(error, data) {
    return {
        type: IMPORT,
        pending: false,
        error: error,
        data
    };
}
