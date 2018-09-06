export const LIST_ROUTES = 'LIST_ROUTES';
export const INSERT_ROUTE = 'INSERT_ROUTE';
export const REMOVE_ROUTE = 'REMOVE_ROUTE';
export const EDIT_ROUTE = 'EDIT_ROUTE';
export const UPDATE_ROUTE = 'UPDATE_ROUTE';
export const EXPORT_ROUTES = 'EXPORT_ROUTES';
export const IMPORT_ROUTES = 'IMPORT_ROUTES';
export const GET_TEMPLATE = 'GET_TEMPLATE';

export function beginListRoutes(index, size) {
    return {
        type: LIST_ROUTES,
        pending: true,
        error: null,
        pagination: {
            index,
            size
        }
    };
}

export function endListRoutes(error, data) {
    return {
        type: LIST_ROUTES,
        pending: false,
        error: error,
        data
    };
}

export function beginInsertRoute(data) {
    return {
        type: INSERT_ROUTE,
        pending: true,
        error: null,
        data
    };
}

export function endInsertRoute(error, data) {
    return {
        type: INSERT_ROUTE,
        pending: false,
        error: error,
        data
    };
}

export function beginRemoveRoute(index) {
    return {
        type: REMOVE_ROUTE,
        pending: true,
        error: null,
        index
    };
}

export function endRemoveRoute(error, index) {
    return {
        type: REMOVE_ROUTE,
        pending: false,
        error: error,
        index
    };
}

export function editRoute(index, enabled) {
    return {
        type: EDIT_ROUTE,
        index,
        enabled
    };
}

export function beginUpdateRoute(index, data) {
    return {
        type: UPDATE_ROUTE,
        pending: true,
        error: null,
        index,
        data
    };
}

export function endUpdateRoute(error, { index, data } = {}) {
    return {
        type: UPDATE_ROUTE,
        pending: false,
        error: error,
        index,
        data
    };
}

export function beginExportRoutes() {
    return {
        type: EXPORT_ROUTES,
        pending: true,
        error: null
    };
}

export function endExportRoutes(error, data) {
    return {
        type: EXPORT_ROUTES,
        pending: false,
        error: error,
        data
    };
}

export function beginImportRoutes(data) {
    return {
        type: IMPORT_ROUTES,
        pending: true,
        error: null,
        data
    };
}

export function endImportRoutes(error, data) {
    return {
        type: IMPORT_ROUTES,
        pending: false,
        error: error,
        data
    };
}

export function beginGetTemplate() {
    return {
        type: GET_TEMPLATE,
        pending: false,
        error: null
    };
}

export function endGetTemplate(error, data) {
    return {
        type: GET_TEMPLATE,
        pending: false,
        error: error,
        data
    };
}
