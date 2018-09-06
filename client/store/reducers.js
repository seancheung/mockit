import * as ACTIONS from './actions';

export function app(
    state = { pending: false, error: null, index: 0, size: 10, template: null },
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
    case ACTIONS.LIST_ROUTES:
        return action.data;
    case ACTIONS.INSERT_ROUTE:
        return [...state, action.data];
    case ACTIONS.REMOVE_ROUTE:
        return state.filter((_, i) => i !== action.index);
    case ACTIONS.UPDATE_ROUTE:
        return state.map((data, i) => {
            if (action.index === i) {
                return Object.assign({}, data, action.data, {
                    edit: false
                });
            }

            return data;
        });
    case ACTIONS.EDIT_ROUTE:
        return state.map((data, i) => {
            if (action.index === i) {
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
