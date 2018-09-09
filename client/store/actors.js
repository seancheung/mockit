import * as creators from './creators';
import * as http from './http';

export function getRoutes(index, size) {
    return async function(dispatch) {
        const action = creators.beginGetRoutes(index, size);
        dispatch(action);
        try {
            const res = await http.getRoutes(action.offset, action.limit);
            dispatch(creators.endGetRoutes(null, res.data));
        } catch (error) {
            dispatch(creators.endGetRoutes(error));
        }
    };
}

export function setMode(mode, selected) {
    return function(dispatch) {
        dispatch(creators.setMode(mode, selected));
    };
}

export function addRoute(data) {
    return async function(dispatch) {
        dispatch(creators.beginAddRoute(data));
        try {
            const res = await http.addRoute(data);
            dispatch(creators.endAddRoute(null, res.data));
        } catch (error) {
            dispatch(creators.endAddRoute(error));
        }
    };
}

export function deleteRoute(id) {
    return async function(dispatch) {
        dispatch(creators.beginDeleteRoute(id));
        try {
            await http.deleteRoute(id);
            dispatch(creators.endDeleteRoute(null, id));
        } catch (error) {
            dispatch(creators.endDeleteRoute(error));
        }
    };
}

export function updateRoute(id, data) {
    return async function(dispatch) {
        dispatch(creators.beginUpdateRoute(id, data));
        try {
            const res = await http.updateRoute(id, data);
            dispatch(creators.endUpdateRoute(null, { id, data: res.data }));
        } catch (error) {
            dispatch(creators.endUpdateRoute(error));
        }
    };
}

export function exportRoutes() {
    return async function(dispatch) {
        dispatch(creators.beginExportRoutes());
        try {
            const res = await http.exportRoutes();
            dispatch(creators.endExportRoutes(null, res.data));
        } catch (error) {
            dispatch(creators.endExportRoutes(error));
        }
    };
}

export function importRoutes(data) {
    return async function(dispatch) {
        dispatch(creators.beginImportRoutes(data));
        try {
            const res = await http.importRoutes(data);
            dispatch(creators.endImportRoutes(null, res.data));
        } catch (error) {
            dispatch(creators.endImportRoutes(error));
        }
    };
}

export function getTemplate() {
    return async function(dispatch) {
        dispatch(creators.beginGetTemplate());
        try {
            const res = await http.getTemplate();
            dispatch(creators.endGetTemplate(null, res.data));
        } catch (error) {
            dispatch(creators.endGetTemplate(error));
        }
    };
}

export function setError(error) {
    return function(dispatch) {
        dispatch(creators.setError(error));
    };
}
