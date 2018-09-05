import * as ACTIONS from './actions';

export function app(state = { pending: false, error: null }, action) {
    if (action.pending) {
        return Object.assign({}, state, { pending: true, error: null });
    }
    if (action.error) {
        return Object.assign({}, state, {
            pending: false,
            error: action.error
        });
    }

    return state;
}

export function routes(state = [], action) {
    if (!action.success) {
        return state;
    }
    switch (action.type) {
    case ACTIONS.LIST:
        return action.data;
    case ACTIONS.INSERT:
        return [...state, action.data];
    case ACTIONS.REMOVE:
        return state.filter((_, i) => i !== action.index);
    case ACTIONS.UPDATE:
        return state.map((route, i) => {
            if (action.index === i) {
                return Object.assign({}, route, action.data);
            }

            return route;
        });
    default:
        return state;
    }
}
