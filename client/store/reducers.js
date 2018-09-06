import * as ACTIONS from './actions';

export function app(
    state = { pending: false, error: null, index: 0, size: 10 },
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

    return state;
}

export function routes(state = [], action) {
    if (action.pending || action.error) {
        return state;
    }
    switch (action.type) {
    case ACTIONS.IMPORT:
    case ACTIONS.LIST:
        return action.data;
    case ACTIONS.INSERT:
        return [...state, action.data];
    case ACTIONS.REMOVE:
        return state.filter((_, i) => i !== action.index);
    case ACTIONS.UPDATE:
        return state.map((data, i) => {
            if (action.index === i) {
                return Object.assign({}, data, action.data, {
                    edit: false
                });
            }

            return data;
        });
    case ACTIONS.EDIT:
        return state.map((data, i) => {
            if (action.index === i) {
                return Object.assign({}, data, { edit: action.enabled });
            }

            return data;
        });
    case ACTIONS.EXPORT:
        // TODO:
        return state;
    default:
        return state;
    }
}
