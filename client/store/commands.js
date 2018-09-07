import * as ACTIONS from './actions';
import * as http from './http';

export function listRoutes(index, size) {
    return async function(dispatch) {
        const action = ACTIONS.beginListRoutes(index, size);
        dispatch(action);
        try {
            const res = await http.listRoutes(action.offset, action.limit);
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
            const res = await http.insertRoute(data);
            dispatch(ACTIONS.endInsertRoute(null, res.data));
        } catch (error) {
            dispatch(ACTIONS.endInsertRoute(error));
        }
    };
}

export function removeRoute(id) {
    return async function(dispatch) {
        dispatch(ACTIONS.beginRemoveRoute(id));
        try {
            await http.removeRoute(id);
            dispatch(ACTIONS.endRemoveRoute(null, id));
        } catch (error) {
            dispatch(ACTIONS.endInsertRoute(error));
        }
    };
}

export function editRoute(id, enabled) {
    return function(dispatch) {
        dispatch(ACTIONS.editRoute(id, enabled));
    };
}

export function updateRoute(id, data) {
    return async function(dispatch) {
        dispatch(ACTIONS.beginUpdateRoute(id, data));
        try {
            const res = await http.updateRoute(id, data);
            dispatch(ACTIONS.endUpdateRoute(null, { id, data: res.data }));
        } catch (error) {
            dispatch(ACTIONS.endUpdateRoute(error));
        }
    };
}

export function dumpRoutes() {
    return async function(dispatch) {
        dispatch(ACTIONS.beginExportRoutes());
        try {
            const res = await http.dumpRoutes();
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
            const res = await http.loadRoutes(data);
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
            const res = await http.getTemplate();
            dispatch(ACTIONS.endGetTemplate(null, res.data));
        } catch (error) {
            dispatch(ACTIONS.endGetTemplate(error));
        }
    };
}
