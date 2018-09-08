import * as CREATORS from './creators';
import * as http from './http';

export function getRoutes(index, size) {
    return async function(dispatch) {
        const action = CREATORS.beginGetRoutes(index, size);
        dispatch(action);
        try {
            const res = await http.getRoutes(action.offset, action.limit);
            dispatch(CREATORS.endGetRoutes(null, res.data));
        } catch (error) {
            dispatch(CREATORS.endGetRoutes(error));
        }
    };
}

export function setMode(mode, selected) {
    return function(dispatch) {
        dispatch(CREATORS.setMode(mode, selected));
    };
}

export function addRoute(data) {
    return async function(dispatch) {
        dispatch(CREATORS.beginAddRoute(data));
        try {
            const res = await http.addRoute(data);
            dispatch(CREATORS.endAddRoute(null, res.data));
        } catch (error) {
            dispatch(CREATORS.endAddRoute(error));
        }
    };
}

export function deleteRoute(id) {
    return async function(dispatch) {
        dispatch(CREATORS.beginDeleteRoute(id));
        try {
            await http.deleteRoute(id);
            dispatch(CREATORS.endDeleteRoute(null, id));
        } catch (error) {
            dispatch(CREATORS.endDeleteRoute(error));
        }
    };
}

export function updateRoute(id, data) {
    return async function(dispatch) {
        dispatch(CREATORS.beginUpdateRoute(id, data));
        try {
            const res = await http.updateRoute(id, data);
            dispatch(CREATORS.endUpdateRoute(null, { id, data: res.data }));
        } catch (error) {
            dispatch(CREATORS.endUpdateRoute(error));
        }
    };
}

export function exportRoutes() {
    return async function(dispatch) {
        dispatch(CREATORS.beginExportRoutes());
        try {
            const res = await http.exportRoutes();
            dispatch(CREATORS.endExportRoutes(null, res.data));
        } catch (error) {
            dispatch(CREATORS.endExportRoutes(error));
        }
    };
}

export function importRoutes(data) {
    return async function(dispatch) {
        dispatch(CREATORS.beginImportRoutes(data));
        try {
            const res = await http.importRoutes(data);
            dispatch(CREATORS.endImportRoutes(null, res.data));
        } catch (error) {
            dispatch(CREATORS.endImportRoutes(error));
        }
    };
}

export function getTemplate() {
    return async function(dispatch) {
        dispatch(CREATORS.beginGetTemplate());
        try {
            const res = await http.getTemplate();
            dispatch(CREATORS.endGetTemplate(null, res.data));
        } catch (error) {
            dispatch(CREATORS.endGetTemplate(error));
        }
    };
}
