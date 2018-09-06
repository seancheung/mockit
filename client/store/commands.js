import * as ACTIONS from './actions';
import http from './http';

export function listRoutes(index, size) {
    return async function(dispatch) {
        dispatch(ACTIONS.beginListRoutes(index, size));
        try {
            const res = await http.get('/routes');
            dispatch(ACTIONS.endListRoutes(null, res.data));
        } catch (error) {
            dispatch(ACTIONS.endListRoutes(error));
        }
    };
}

export function insertRoute(data) {
    return async function(dispatch) {
        dispatch(ACTIONS.beginInsertRoute(data));
        try {
            const res = await http.post('/routes', data);
            dispatch(ACTIONS.endInsertRoute(null, res.data));
        } catch (error) {
            dispatch(ACTIONS.endInsertRoute(error));
        }
    };
}

export function removeRoute(index) {
    return async function(dispatch) {
        dispatch(ACTIONS.beginRemoveRoute(index));
        try {
            await http.delete(`/routes/${index}`);
            dispatch(ACTIONS.endRemoveRoute(null, index));
        } catch (error) {
            dispatch(ACTIONS.endInsertRoute(error));
        }
    };
}

export function editRoute(index, enabled) {
    return function(dispatch) {
        dispatch(ACTIONS.editRoute(index, enabled));
    };
}

export function updateRoute(index, data) {
    return async function(dispatch) {
        dispatch(ACTIONS.beginUpdateRoute(index, data));
        try {
            const res = await http.put(`/routes/${index}`, data);
            dispatch(ACTIONS.endUpdateRoute(null, { index, data: res.data }));
        } catch (error) {
            dispatch(ACTIONS.endUpdateRoute(error));
        }
    };
}

export function dumpRoutes() {
    return async function(dispatch) {
        dispatch(ACTIONS.beginExportRoutes());
        try {
            const res = await http.get('/export');
            dispatch(ACTIONS.endExportRoutes(null, res.data));
        } catch (error) {
            dispatch(ACTIONS.endExportRoutes(error));
        }
    };
}

export function loadRoutes(data) {
    return async function(dispatch) {
        dispatch(ACTIONS.beginImportRoutes(data));
        try {
            const res = await http.post('/import', data);
            dispatch(ACTIONS.endImportRoutes(null, res.data));
        } catch (error) {
            dispatch(ACTIONS.endImportRoutes(error));
        }
    };
}

export function getTemplate() {
    return async function(dispatch) {
        dispatch(ACTIONS.beginGetTemplate());
        try {
            const res = await http.get('/template');
            dispatch(ACTIONS.endGetTemplate(null, res.data));
        } catch (error) {
            dispatch(ACTIONS.endGetTemplate(error));
        }
    };
}
