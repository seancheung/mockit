import * as ACTIONS from './actions';

export function app(
    state = {
        pending: false,
        error: null,
        index: 0,
        size: 10,
        pages: 0,
        count: 0,
        template: null
    },
    action
) {
    if (action.pending) {
        return Object.assign({}, state, { pending: true, error: null });
    }
    if (action.error) {
        return Object.assign({}, state, {
            pending: false,
            error: action.error
        });
    }

    switch (action.type) {
    case ACTIONS.GET_TEMPLATE:
        return Object.assign({}, state, { template: action.data });
    case ACTIONS.LIST_ROUTES: {
        return Object.assign({}, state, {
            index: action.index,
            size: action.size,
            pages: action.pages,
            count: action.count
        });
    }
    default:
        return state;
    }
}

export function routes(state = [], action) {
    if (action.pending || action.error) {
        return state;
    }
    switch (action.type) {
    case ACTIONS.IMPORT_ROUTES:
        // TODO:
        return state;
    case ACTIONS.LIST_ROUTES:
        return action.data;
    case ACTIONS.INSERT_ROUTE:
        // return [...state, action.data];
        // NOTE: pagination support
        return state;
    case ACTIONS.REMOVE_ROUTE:
        // return state.filter(data => data.id !== action.id);
        // NOTE: pagination support
        return state;
    case ACTIONS.UPDATE_ROUTE:
        return state.map(data => {
            if (action.id === data.id) {
                return Object.assign({}, data, action.data, {
                    edit: false
                });
            }

            return data;
        });
    case ACTIONS.EDIT_ROUTE:
        return state.map(data => {
            if (action.id === data.id) {
                return Object.assign({}, data, { edit: action.enabled });
            }

            return data;
        });
    case ACTIONS.EXPORT_ROUTES:
        // TODO:
        return state;
    default:
        return state;
    }
}
