import * as ACTIONS from './actions';
import http from './http';

export function list(index, size) {
    return async function(dispatch) {
        dispatch(ACTIONS.beginList(index, size));
        try {
            const res = await http.get('/routes');
            dispatch(ACTIONS.endList(null, res.data));
        } catch (error) {
            dispatch(ACTIONS.endList(error));
        }
    };
}

export function insert(data) {
    return async function(dispatch) {
        dispatch(ACTIONS.beginInsert(data));
        try {
            const res = await http.post('/routes', data);
            dispatch(ACTIONS.endInsert(null, res.data));
        } catch (error) {
            dispatch(ACTIONS.endInsert(error));
        }
    };
}

export function remove(index) {
    return async function(dispatch) {
        dispatch(ACTIONS.beginRemove(index));
        try {
            await http.delete(`/routes/${index}`);
            dispatch(ACTIONS.endRemove(null, index));
        } catch (error) {
            dispatch(ACTIONS.endInsert(error));
        }
    };
}

export function edit(index, enabled) {
    return function(dispatch) {
        dispatch(ACTIONS.edit(index, enabled));
    };
}

export function update(index, data) {
    return async function(dispatch) {
        dispatch(ACTIONS.beginUpdate(index, data));
        try {
            const res = await http.put(`/routes/${index}`, data);
            dispatch(ACTIONS.endUpdate(null, { index, data: res.data }));
        } catch (error) {
            dispatch(ACTIONS.endUpdate(error));
        }
    };
}

export function dump() {
    return async function(dispatch) {
        dispatch(ACTIONS.beginExport());
        try {
            const res = await http.get('/export');
            dispatch(ACTIONS.endExport(null, res.data));
        } catch (error) {
            dispatch(ACTIONS.endExport(error));
        }
    };
}

export function load(data) {
    return async function(dispatch) {
        dispatch(ACTIONS.beginImport(data));
        try {
            const res = await http.get('/import');
            dispatch(ACTIONS.endImport(null, res.data));
        } catch (error) {
            dispatch(ACTIONS.endImport(error));
        }
    };
}
