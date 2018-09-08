import * as ACTIONS from './actions';

export function beginGetRoutes(index, size) {
    return {
        type: ACTIONS.GET_ROUTES,
        pending: true,
        offset: index * size,
        limit: size
    };
}

export function endGetRoutes(error, data) {
    const action = {
        type: ACTIONS.GET_ROUTES,
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

export function setMode(mode, selected) {
    return {
        type: ACTIONS.SET_MODE,
        mode,
        selected
    };
}

export function beginAddRoute(data) {
    return {
        type: ACTIONS.ADD_ROUTE,
        pending: true,
        data
    };
}

export function endAddRoute(error, data) {
    return {
        type: ACTIONS.ADD_ROUTE,
        error: error,
        data
    };
}

export function beginDeleteRoute(id) {
    return {
        type: ACTIONS.DELETE_ROUTE,
        pending: true,
        id
    };
}

export function endDeleteRoute(error, id) {
    return {
        type: ACTIONS.DELETE_ROUTE,
        error: error,
        id
    };
}

export function beginUpdateRoute(id, data) {
    return {
        type: ACTIONS.UPDATE_ROUTE,
        pending: true,
        id,
        data
    };
}

export function endUpdateRoute(error, { id, data } = {}) {
    return {
        type: ACTIONS.UPDATE_ROUTE,
        error: error,
        id,
        data
    };
}

export function beginExportRoutes() {
    return {
        type: ACTIONS.EXPORT_ROUTES,
        pending: true,
        error: null
    };
}

export function endExportRoutes(error, data) {
    return {
        type: ACTIONS.EXPORT_ROUTES,
        error: error,
        data
    };
}

export function beginImportRoutes(data) {
    return {
        type: ACTIONS.IMPORT_ROUTES,
        pending: true,
        data
    };
}

export function endImportRoutes(error, data) {
    return {
        type: ACTIONS.IMPORT_ROUTES,
        error: error,
        data
    };
}

export function beginGetTemplate() {
    return {
        type: ACTIONS.GET_TEMPLATE,
        pending: true,
        error: null
    };
}

export function endGetTemplate(error, data) {
    return {
        type: ACTIONS.GET_TEMPLATE,
        error: error,
        data
    };
}
