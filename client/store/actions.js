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
        offset: index * size,
        limit: size
    };
}

export function endListRoutes(error, data) {
    const action = {
        type: LIST_ROUTES,
        pending: false,
        error: error
    };
    if (data) {
        const { offset, limit, count, records } = data;
        Object.assign(action, {
            data: records,
            index: Math.ceil(offset / limit),
            size: limit,
            pages: Math.ceil(count / limit),
            count
        });
    }

    return action;
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

export function beginRemoveRoute(id) {
    return {
        type: REMOVE_ROUTE,
        pending: true,
        error: null,
        id
    };
}

export function endRemoveRoute(error, id) {
    return {
        type: REMOVE_ROUTE,
        pending: false,
        error: error,
        id
    };
}

export function editRoute(id, enabled) {
    return {
        type: EDIT_ROUTE,
        id,
        enabled
    };
}

export function beginUpdateRoute(id, data) {
    return {
        type: UPDATE_ROUTE,
        pending: true,
        error: null,
        id,
        data
    };
}

export function endUpdateRoute(error, { id, data } = {}) {
    return {
        type: UPDATE_ROUTE,
        pending: false,
        error: error,
        id,
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
