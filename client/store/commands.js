import * as ACTIONS from './actions';
import http from '../http';

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

export function update(index, data) {
    return async function(dispatch) {
        dispatch(ACTIONS.beginUpdate(index, data));
        try {
            await http.put(`/routes/${index}`, data);
            dispatch(ACTIONS.endUpdate(null, index));
        } catch (error) {
            dispatch(ACTIONS.endUpdate(error));
        }
    };
}
